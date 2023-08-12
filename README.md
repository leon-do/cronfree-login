# NextJS Supabase Auth

<img width="1091" alt="Screenshot 2023-08-09 at 12 50 59 AM" src="https://github.com/leon-do/nextjs-supabase-auth/assets/19412160/ee5d74f4-0fb7-481f-b403-46dbe569dfeb">

## Create .env.local

```
NEXT_PUBLIC_SUPABASE_URL=https://lbykpswpsjbwpadg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR

STRIPE_SECRET_KEY=sk_test_51NcLpHBcTXf
STRIPE_WEBHOOK_SIGNING_SECRET=whsec_Wv46sF5cjzpDEcuC
NEXT_PUBLIC_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_3cs4j2h2xgcu26Q000?prefilled_email=
NEXT_PUBLIC_STRIPE_PORTAL_URL=https://billing.stripe.com/p/login/4gw5lr01K511ebe000?prefilled_email=

```

## Start

```bash
npm install
npm run dev
```

## Supabase Query

```sql
create view public.users as select * from auth.users;
revoke all on public.users from anon, authenticated;
```

## Stripe

Payment: https://dashboard.stripe.com/payment-links

Portal: https://dashboard.stripe.com/settings/billing/portal

Webhook: https://dashboard.stripe.com/test/webhooks/create?events=customer.subscription.created%2Ccustomer.subscription.updated
