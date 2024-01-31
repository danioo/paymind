'use client';

import { InvoiceEdit } from '@/components/InvoiceEdit/InvoiceEdit';
import { Modal } from '@mantine/core';

export default function EditForm({ params }: { params: { id: string } }) {
  return (
    <Modal opened={true} onClose={() => null}>
      <InvoiceEdit id={params.id} />
    </Modal>
  );
}
