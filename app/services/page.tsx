import { Metadata } from 'next';
import ServicesGrid from '@/components/services/ServicesGrid';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Our Services - HomeServe Pro',
  description: 'Professional home improvement and maintenance services including plumbing, roofing, mold removal, tree trimming, appliance repair, bathroom remodeling, and locksmith services.',
};

export default function ServicesPage() {
  return (
    <div className="gradient-bg min-h-screen">
      <PageHeader 
        title="Our Services"
        description="Professional home improvement and maintenance services to keep your home in perfect condition"
      />
      <ServicesGrid />
    </div>
  );
}