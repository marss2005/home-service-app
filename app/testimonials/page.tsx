import { Metadata } from 'next';
import TestimonialsGrid from '@/components/testimonials/TestimonialsGrid';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Customer Testimonials - HomeServe Pro',
  description: 'Read what our satisfied customers say about our professional home services.',
};

export default function TestimonialsPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Customer Testimonials"
        description="See what our satisfied customers say about our professional home services"
      />
      <TestimonialsGrid />
    </div>
  );
}