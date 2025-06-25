import { Metadata } from 'next';
import PaymentMethod from '@/components/payment/PaymentMethod';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Payment - HomeServe Pro',
  description: 'Secure payment options for your home service booking.',
};

export default function PaymentPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Payment"
        description="Choose your preferred payment method to complete your service booking"
      />
      <PaymentMethod />
    </div>
  );
}