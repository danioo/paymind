'use client';

import { InvoiceEdit } from '@/components/InvoiceEdit/InvoiceEdit';
import { Modal } from '@mantine/core';

export default function InvoiceEditModal({ id }: { id: string }) {
  return (
    <Modal opened={true} onClose={() => null}>
      <InvoiceEdit id={id} />
    </Modal>
  );
}
