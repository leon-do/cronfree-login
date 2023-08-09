import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Signout from "./Signout";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Account() {
  const supabase = createServerComponentClient<any>({ cookies });
  const { session } = (await supabase.auth.getSession()).data;
  if (!session) redirect("/");

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Account</h2>
          <Signout />
        </div>

        {/* Panel1 */}
        <div className="m-5 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Info</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Email: {session.user.email}</p>
              <p>Plan: {session.user.user_metadata.usage > 1 ? "Paid" : "Free"}</p>
              <p>
                Usage: {session.user.user_metadata.usage} of {session.user.user_metadata.total}
              </p>
            </div>
          </div>
        </div>

        {/* Panel2 */}
        <div className="m-5 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Zapier</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Schedule Plus is a Zapier app used for recurring tasks. Trigger actions every day of the day, month, week or month.</p>
            </div>
            <div className="mt-5">
              <Link href="https://google.com">
                <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Connect to Zapier
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Panel3 */}
        <div className="m-5 mt-5bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Payment</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Upgrade or manage your subscription</p>
            </div>
            <div className="mt-5">
              <Link href={session.user.user_metadata.total > 1 ? "https://google.com" : "https://facebook.com"}>
                <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  {session.user.user_metadata.total > 1 ? "Manage" : "Upgrade"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
