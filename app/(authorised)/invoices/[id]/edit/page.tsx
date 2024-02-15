import { InvoiceEdit } from '@/components/InvoiceEdit/InvoiceEdit';

export default async function EditForm({ params }: { params: { id: string } }) {
  return <InvoiceEdit id={params.id} />;
}
