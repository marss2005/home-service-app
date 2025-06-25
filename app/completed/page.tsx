import { Metadata } from 'next';
import ServiceCompleted from '@/components/completed/ServiceCompleted';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Service Completed - HomeServe Pro',
  description: 'View details of your completed services and provide feedback.',
};

export default function CompletedPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Service Completed"
        description="View your completed services, invoices, and provide feedback"
      />
      <ServiceCompleted />
    </div>
  );
}