import { Metadata } from 'next';
import { Suspense } from 'react';
import PaymentMethod from '@/components/payment/PaymentMethod';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Payment - HomeServe Pro',
  description: 'Secure payment options for your home service booking.',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';

function PaymentContent() {
  return <PaymentMethod />;
}

export default function PaymentPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Payment"
        description="Choose your preferred payment method to complete your service booking"
      />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div>Loading payment details...</div>
        </div>
      }>
        <PaymentContent />
      </Suspense>
    </div>
  );
}