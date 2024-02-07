insert into auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,email_change_confirm_status,is_sso_user) values ('00000000-0000-0000-0000-000000000000','025763ef-f743-4266-b0d6-2cb860ba81b1','authenticated','authenticated','daniel.buk@vp.pl','$2a$10$ejGz7qEOKNlgjQPuUcqG4e3TAXO9RQXlf2N/lJe/da78IBlQ9uRiC','2024-02-06 06:46:45.597195+00','{"provider":"email","providers":["email"]}','{}','2024-02-06 06:46:45.593462+00','2024-02-06 06:46:45.597283+00',0,false);

insert into public.invoices (invoice_number, invoice_amount, due_date, user_id, supplier_name, notifications_on) values ('INV-123', 123.45, '2024-03-01', '025763ef-f743-4266-b0d6-2cb860ba81b1', 'Play', false);

select cron.schedule (
  'usages-reset',
  '0 0 1 * *',
  $$ update usages set usage = 0 $$
);