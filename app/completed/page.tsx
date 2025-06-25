import { Suspense } from 'react';
import ServiceCompleted from '@/components/completed/ServiceCompleted';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function CompletedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceCompleted />
    </Suspense>
  );
}