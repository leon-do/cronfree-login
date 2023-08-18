import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default async function downgradeSubscription(event: any): Promise<void> {
  try {
    const customer: any = await stripe.customers.retrieve(
      event.data.object.customer
    );

    // update total to 1
    const { error } = await supabase
      .from("account")
      .update({ total: 1, usage: 0 })
      .eq("email", customer.email);
    if (error) throw new Error(error.message);

    // get all cron jobs
    const cron = await supabase
      .from("cron")
      .select("*")
      .eq("email", customer.email);
    if (cron.error) throw new Error(cron.error.message);

    // delete all cron jobs from cron-job.org
    for (const job of cron.data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CRON_API_KEY as string}`,
      };
      await axios.delete(`https://api.cron-job.org/jobs/${job.job_id}`, {
        headers,
      });
    }

    // delete all cron jobs from table
    await supabase.from("cron").delete().eq("email", customer.email);
  } catch (error) {
    throw new Error(
      `Error deleting subscription ${event.data.object.customer}`
    );
  }
}
