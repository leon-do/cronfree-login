import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("/zapier/performList", body);

  if (!body.license_key)
    return NextResponse.json(
      { success: false, error: "Unauthorized License Key" },
      {
        status: 401,
      }
    );

  // query supabase for user
  const { data, error } = await supabase
    .from("account")
    .select("*")
    .eq("license_key", body.license_key);

  if (error || data.length === 0)
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      {
        status: 401,
      }
    );

  // check if usage >= total
  if (data[0].usage >= data[0].total)
    return NextResponse.json(
      { success: false, error: "Usage Exceeded. Please Upgrade Plan" },
      {
        status: 401,
      }
    );
  return NextResponse.json({ success: true });
}
