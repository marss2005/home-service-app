import { Metadata } from 'next';
import ServiceStatus from '@/components/status/ServiceStatus';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Service Status - HomeServe Pro',
  description: 'Track the status of your ongoing and scheduled services.',
};

export default function StatusPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Service Status"
        description="Track your ongoing and scheduled services in real-time"
      />
      <ServiceStatus />
    </div>
  );
}