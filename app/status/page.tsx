import { Metadata } from 'next';
import { Suspense } from 'react';
import ServiceStatus from '@/components/status/ServiceStatus';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Service Status - HomeServe Pro',
  description: 'Track the status of your ongoing and scheduled services.',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';

function StatusContent() {
  return <ServiceStatus />;
}

export default function StatusPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Service Status"
        description="Track your ongoing and scheduled services in real-time"
      />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div>Loading status...</div>
        </div>
      }>
        <StatusContent />
      </Suspense>
    </div>
  );
}