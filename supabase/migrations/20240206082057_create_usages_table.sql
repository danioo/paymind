create table if not exists "public"."usages" (
    "user_id" uuid not null,
    "usage" smallint not null default '0'::smallint
);