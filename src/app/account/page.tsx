import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import getAccount from "./getAccount";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = createServerComponentClient<any>({ cookies });
  const { session } = (await supabase.auth.getSession()).data;

  if (!session || !session.user.email) redirect("/");

  const account = await getAccount(session.user.email);
  if (!account) redirect("/");

  // https://dashboard.stripe.com/payment-links
  const stripePayment =
    (process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL as string) + account.email;
  // https://dashboard.stripe.com/settings/billing/portal
  const stripePortal =
    (process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL as string) + account.email;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Account
          </h2>
          <form action="/auth/signout" method="post">
            <button
              className="rounded-md bg-white px-2.5 py-1.5 text-m font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Panel1 */}
        <div className="m-5 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Info
            </h3>
            <div className="mt-2 text-m text-gray-500">
              <p className="m-3">Email: {account.email}</p>
              <p className="m-3">Plan: {account.usage > 1 ? "Paid" : "Free"}</p>
              <p className="m-3">
                Usage: {account.usage} of {account.total}
              </p>
              <p className="m-3">License Key: {account.license_key}</p>
            </div>
          </div>
        </div>

        {/* Panel2 */}
        <div className="m-5 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Zapier
            </h3>
            <div className="mt-2 text-m text-gray-500">
              <p className="m-3">
                Cronfree is a Zapier app used for recurring tasks. Use the
                License Key to connect.
              </p>
            </div>
            <div className="m-3">
              <Link
                href="https://zapier.com/developer/public-invite/189424/7d746e1121713e0895f27c240d43e186/"
                target="_blank"
              >
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-m font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  Connect to Zapier
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Panel3 */}
        <div className="m-5 mt-5bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Payment
            </h3>
            <div className="mt-2 text-m text-gray-500">
              <p className="m-3">Upgrade or manage your subscription</p>
            </div>
            <div className="m-3">
              <Link
                href={account.total > 1 ? stripePortal : stripePayment}
                target="_blank"
              >
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-m font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  {account.total > 1
                    ? "Manage Subscription"
                    : "Upgrade Account"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
