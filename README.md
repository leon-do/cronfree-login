# NextJS Supabase Auth

<img width="1091" alt="Screenshot 2023-08-09 at 12 50 59 AM" src="https://github.com/leon-do/nextjs-supabase-auth/assets/19412160/ee5d74f4-0fb7-481f-b403-46dbe569dfeb">

## Create .env.local

```
NEXT_PUBLIC_SUPABASE_URL=https://falpiwjvcgbiiuqjqdvx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE=eyJhbGc...
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
