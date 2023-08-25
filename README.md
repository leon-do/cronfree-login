# NextJS Supabase Stripe Auth

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

CRON_API_KEY=C3sTg4yO3q
```

## Start

```bash
npm install
npm run dev
```

## Supabase

```sql
create view public.users as select * from auth.users;
revoke all on public.users from anon, authenticated;

CREATE TABLE public.account (
  email VARCHAR PRIMARY KEY,
  license_key VARCHAR DEFAULT uuid_generate_v4(),
  usage INTEGER DEFAULT 0,
  total INTEGER DEFAULT 1
);
ALTER TABLE public.account ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.cron (
    job_id VARCHAR  PRIMARY KEY,
    hook_url VARCHAR UNIQUE,
    email VARCHAR UNIQUE
);
ALTER TABLE public.cron ENABLE ROW LEVEL SECURITY;
```

![](https://github.com/leon-do/3d-printed-glasses/assets/19412160/284d8b6a-a2c2-4f2e-85c3-ed24b82c2599)

![](https://github.com/leon-do/web3hook/assets/19412160/a452ebd0-7078-47aa-bfee-e72fda1f586c)

## Stripe

Payment: https://dashboard.stripe.com/payment-links

Portal: https://dashboard.stripe.com/settings/billing/portal

Webhook: https://dashboard.stripe.com/test/webhooks/create?events=customer.subscription.created%2Ccustomer.subscription.updated

  - `https://cronfree.com/stripe`

![](https://github.com/leon-do/3d-printed-glasses/assets/19412160/25b1b8d2-8462-4e0b-ace3-7249509122f2)

![](https://github.com/leon-do/3d-printed-glasses/assets/19412160/1c6c25aa-3df3-4e86-98ea-66dc224c3526)

## Cron

https://console.cron-job.org/settings

![](https://github.com/leon-do/3d-printed-glasses/assets/19412160/bcbe7cbd-a5fe-4149-805c-8c3e7b9342db)
