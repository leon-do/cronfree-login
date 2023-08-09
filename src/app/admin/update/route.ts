import { NextRequest, NextResponse } from "next/server";
const { createClient } = require("@supabase/supabase-js");

export async function GET(req: NextRequest) {
  // https://supabase.com/docs/reference/javascript/admin-api
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // https://github.com/supabase/gotrue-js/issues/359#issuecomment-1203893970
  const user = await supabase.from("users").select().eq("email", "vietnow1591@gmail.com");
  if (user.error) return NextResponse.json({ error: "Could Not Find User With Email" }, { status: 400 });

  const id = user.data[0].id;
  console.log(id);

  // https://supabase.com/docs/reference/javascript/auth-admin-updateuserbyid
  const status = await supabase.auth.admin.updateUserById(id, {
    user_metadata: { usage: 1, total: 5 },
  });
  if (status.error) return NextResponse.json({ error: "Could Not Update User" }, { status: 400 });

  return NextResponse.json({ success: true });
}
