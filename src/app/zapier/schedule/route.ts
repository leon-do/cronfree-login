import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import createCron from "./createCron";
import axios from "axios";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("/zapier/schedule", body);

    if (!body.license_key)
      return NextResponse.json([{ id: false }], {
        status: 401,
        statusText: "Unauthorized",
      });

    // query supabase for user
    const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("license_key", body.license_key);
    if (error || data.length === 0)
      return NextResponse.json([{ id: false }], {
        status: 401,
        statusText: "Unauthorized",
      });

    // check if usage > total
    if (data[0].usage > data[0].total)
      return NextResponse.json([{ id: false }], {
        status: 401,
        statusText: "Usage Exceeded. Upgrade to Plan",
      });

    // set cron job
    const jobId = await createCron({
      license_key: body.license_key,
      hookUrl: body.hookUrl,
      timezone: body.timezone,
      hours: body.hours.includes("-1")
        ? [-1]
        : Array.from(new Set(body.hours)).map((item) => Number(item)),
      mdays: body.mdays.includes("-1")
        ? [-1]
        : Array.from(new Set(body.mdays)).map((item) => Number(item)),
      minutes: body.minutes.includes("-1")
        ? [-1]
        : Array.from(new Set(body.minutes)).map((item) => Number(item)),
      months: body.months.includes("-1")
        ? [-1]
        : Array.from(new Set(body.months)).map((item) => Number(item)),
      wdays: body.wdays.includes("-1")
        ? [-1]
        : Array.from(new Set(body.wdays)).map((item) => Number(item)),
    });

    // send response
    await axios.post(body.hookUrl, { jobId });

    return NextResponse.json({ status: true});
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { id: false },
      { status: 401, statusText: "Unauthorized" }
    );
  }
}
