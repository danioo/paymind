set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_invoice()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  with usage as (
    select usage from usages where user_id = new.user_id
  )
  update usages set usage = usage + 1 where user_id = new.user_id;
  return new;
end;
$function$
;

CREATE TRIGGER usage_update_trigger AFTER INSERT ON public.invoices FOR EACH ROW EXECUTE FUNCTION handle_new_invoice();


