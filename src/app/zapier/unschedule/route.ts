import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import deleteCron from "./deleteCron";

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
    // get body
    const body = await req.json();
    console.log("/zapier/unschedule", body);
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
    // delete cron job
    const isCronDeleted = await deleteCron(body.hookUrl);
    if (!isCronDeleted)
      return NextResponse.json([{ id: false }], {
        status: 401,
        statusText: "Error Deleting Schedule",
      });
    return NextResponse.json([{ id: true }]);
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { id: false },
      { status: 401, statusText: "Unauthorized" }
    );
  }
}
