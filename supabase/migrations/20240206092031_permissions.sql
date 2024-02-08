alter table "public"."profiles" drop constraint if exists "profiles_id_fkey";

alter table "public"."profiles" drop constraint if exists "profiles_pkey";

drop index if exists "public"."profiles_pkey";

alter table "public"."invoices" enable row level security;

alter table "public"."profiles" drop column if exists "id";

alter table "public"."profiles" add column if not exists "user_id" uuid not null;

alter table "public"."profiles" enable row level security;

alter table "public"."usages" enable row level security;

CREATE UNIQUE INDEX usages_pkey ON public.usages USING btree (user_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (user_id);

drop policy if exists "Enable select for users based on user_id" on "public"."invoices";

create policy "Enable select for users based on user_id"
on "public"."invoices"
as permissive
for select
to public
using ((auth.uid() = user_id));

drop policy if exists "Enable select for users based on user_id" on "public"."profiles";

create policy "Enable select for users based on user_id"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = user_id));

drop policy if exists "Enable select for users based on user_id" on "public"."usages";

create policy "Enable select for users based on user_id"
on "public"."usages"
as permissive
for select
to public
using ((auth.uid() = user_id));



