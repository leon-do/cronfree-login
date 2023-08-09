"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const supabase = createClientComponentClient<any>();

  useEffect(() => {
    // if user is logged in, redirect to account page, else show login page
    supabase.auth.getSession().then(({ data }) => {
      data?.session ? (window.location.href = "/account") : setIsClient(true);
    });
  }, []);

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login or Sign Up</h2>
          </div>
          {isClient ? <Auth supabaseClient={supabase} view="magic_link" appearance={{ theme: ThemeSupa }} theme="light" showLinks={false} providers={[]} redirectTo={`${window.location.href}auth/callback`} /> : ""}
        </div>
      </div>
    </>
  );
}
