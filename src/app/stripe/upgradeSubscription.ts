import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

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

export default async function upgradeSubscription(event: any): Promise<void> {
  try {
    const customer: any = await stripe.customers.retrieve(
      event.data.object.customer
    );
    const { error } = await supabase
      .from("account")
      .update({ total: 20 })
      .eq("email", customer.email);
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(
      `Error creating subscription ${event.data.object.customer}`
    );
  }
}
