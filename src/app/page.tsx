"use client";
import Image from "next/image";
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
  }, [supabase.auth]);

  return (
    <>
      {isClient ? (
        <div className="h-[80vh]">
          <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-10">
              <div className="flex justify-center">
                <Image src="/logo.svg" alt="logo" width="120" height="120" />
              </div>
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Login or Sign Up
                </h2>
              </div>

              <Auth
                supabaseClient={supabase}
                view="magic_link"
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#588157",
                        brandAccent: "#588157",
                      },
                    },
                  },
                }}
                theme="light"
                showLinks={false}
                providers={[]}
                redirectTo={`${window.location.href}auth/callback`}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
