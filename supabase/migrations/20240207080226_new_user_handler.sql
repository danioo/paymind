set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into profiles (user_id, first_name, last_name) values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  insert into usages (user_id) values (new.id);
  return new;
end;
$function$
;

CREATE TRIGGER new_user_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();
