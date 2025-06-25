import { Metadata } from 'next';
import ServiceConfirmation from '@/components/services/ServiceConfirmation';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Confirm Service - HomeServe Pro',
  description: 'Confirm your service booking and connect with our professional technicians.',
};

export default function ConfirmServicePage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Confirm Your Service"
        description="Provide your details and we'll connect you with the best technician for your needs"
      />
      <ServiceConfirmation />
    </div>
  );
}