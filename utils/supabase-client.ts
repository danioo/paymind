import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/schema.gen';

export const getBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
