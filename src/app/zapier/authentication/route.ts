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
  try {
    // get body
    const body = await req.json();
    console.log("/zapier/authentication", body);
    if (!body.license_key)
      return NextResponse.json([{ id: false }], {
        status: 401,
        statusText: "Missing License Key",
      });
    // query supabase for user
    const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("license_key", body.license_key);
    if (error)
      return NextResponse.json(
        { success: false },
        { status: 401, statusText: "Invalid License Key" }
      );
    // check if the user has an account
    if (data.length === 1) return NextResponse.json([{ id: true }]);
    // if no user then unauthorized
    return NextResponse.json(
      { success: false },
      { status: 401, statusText: "Unauthorized" }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 401, statusText: "Unauthorized" }
    );
  }
}
