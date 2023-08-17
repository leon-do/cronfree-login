import axios from "axios";
import { createClient } from "@supabase/supabase-js";

interface Cron {
  hookUrl: string;
  timezone: string;
  hours: number[];
  mdays: number[];
  minutes: number[];
  months: number[];
  wdays: number[];
}

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

// https://docs.cron-job.org/rest-api.html#creating-a-cron-job
export default async function createCron(cron: Cron): Promise<number> {
  const data = {
    job: {
      url: cron.hookUrl,
      enabled: "true",
      saveResponses: true,
      schedule: {
        timezone: cron.timezone,
        expiresAt: 0,
        hours: cron.hours,
        mdays: cron.mdays,
        minutes: cron.minutes,
        months: cron.months,
        wdays: cron.wdays,
      },
    },
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CRON_API_KEY as string}`,
  };
  // create cron job
  const response = await axios.put("https://api.cron-job.org/jobs", data, {
    headers,
  });

  // save cron job to table
  await supabase
    .from("cron")
    .insert({ hook_url: cron.hookUrl, job_id: response.data.jobId });

  return response.data.jobId;
}