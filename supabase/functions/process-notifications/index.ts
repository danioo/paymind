import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization')!,
          },
        },
      },
    );

    const { data, invoicesError } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('notifications_on', true);

    if (invoicesError) {
      return new Response(JSON.stringify(invoicesError), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    for (const invoice of data) {
      // compute dates diff
      const invoiceDate = new Date(invoice.due_date);
      const today = new Date();
      today.setMilliseconds(0);
      today.setSeconds(0);
      today.setMinutes(0);
      today.setHours(0);
      const dateDiff = invoiceDate - today;

      // make decission about notification
      switch (dateDiff) {
        case 86400000:
          // send email
          const { data: profile, profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('user_id', invoice.user_id)
            .limit(1)
            .single();

          if (profileError) {
            return new Response(JSON.stringify(invoicesError), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400,
            });
          }

          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            },
            body: JSON.stringify({
              from: 'onboarding@resend.dev',
              to: profile.email,
              subject: 'Invoice due date',
              html: `Your invoice (${invoice.invoice_number}) is near due date (${invoice.due_date}), make sure you paid already!`,
            }),
          });

          if (res.status !== 200) {
            return new Response(JSON.stringify(await res.json()), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400,
            });
          }

          break;
        case 0:
          // in app notification
          break;
      }
    }

    return new Response(null, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/process-notifications' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU' \
    --header 'Content-Type: application/json' \

*/
