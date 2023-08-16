import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

interface Account {
  email: string;
  license_key: string;
  usage: number;
  total: number;
}

export default async function getAccount(
  email: string
): Promise<Account | null> {
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

  // check if the user has an account
  const user = await supabase.from("account").select("*").eq("email", email);
  if (user.error) return null;
  if (user.data && user.data.length == 1) return user.data[0];

  // if no data, create an account
  const account: Account = {
    email,
    license_key: uuidv4(),
    usage: 0,
    total: 1,
  };
  const { error } = await supabase.from("account").insert(account);
  if (error) return null;
  return account;
}
