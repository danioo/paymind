import { getReadServerClient } from '@/utils/supabase-server';
import Script from 'next/script';

export default async function Pricing() {
  const supabase = getReadServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://js.stripe.com/v3/pricing-table.js"
      />

      <stripe-pricing-table
        pricing-table-id="prctbl_1QAU2508fDmm2f95kRmOzF2m"
        publishable-key="pk_live_51QA6iV08fDmm2f95vbs3W5LRJgrzu8JMQ9QcDJr89735gRUkgw3PIxQwo6YRMC65TY7YM5qS6OCq0d6kvSrQHEAr00o8DYTQDf"
        customer-email={user?.email}
      />
    </>
  );
}
