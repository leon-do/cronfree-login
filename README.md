# NextJS Supabase Auth

<img width="1091" alt="Screenshot 2023-08-09 at 12 50 59 AM" src="https://github.com/leon-do/nextjs-supabase-auth/assets/19412160/ee5d74f4-0fb7-481f-b403-46dbe569dfeb">

## Create .env.local

```
NEXT_PUBLIC_SUPABASE_URL=https://lbypswsepjbwadg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR

NEXT_PUBLIC_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_3cs4j2h2xgcu26Q000?prefilled_email=
NEXT_PUBLIC_STRIPE_PORTAL_URL=https://billing.stripe.com/p/login/4gw5lr01K511ebe000?prefilled_email=
```

## Supabase Query

```sql
create view public.users as select * from auth.users;
revoke all on public.users from anon, authenticated;
```

## Start

```bash
npm install
npm run dev
```

## Misc

user.user_metadata

```json
{
  "api_key": "38393f1b-75eb-47df-bc88-7339b2b0434d",
  "usage": 1,
  "total": 1
}
```

`/admin/update` will update user's metadata
