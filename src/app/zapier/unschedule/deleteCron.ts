import axios from "axios";
import { createClient } from "@supabase/supabase-js";

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

// https://docs.cron-job.org/rest-api.html#deleting-a-cron-job
export default async function deleteCron(hookUrl: string): Promise<boolean> {
  // query cron table
  const { data, error } = await supabase
    .from("cron")
    .select("*")
    .eq("hook_url", hookUrl);
  if (error || data.length === 0) return false;

  // delete cron job
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CRON_API_KEY as string}`,
  };
  await axios.delete(`https://api.cron-job.org/jobs/${data[0].job_id}`, {
    headers,
  });

  // get account usage
  const account = await supabase
    .from("account")
    .select("*")
    .eq("email", data[0].email);
  if (account.error || account.data.length === 0) return false;

  // decreate usage by 1
  await supabase
    .from("account")
    .update({ usage: account.data[0].usage - 1 })
    .eq("email", data[0].email);

  // delete cron from table
  await supabase.from("cron").delete().eq("job_id", data[0].job_id);

  return true;
}
