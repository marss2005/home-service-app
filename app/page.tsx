import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import CTASection from '@/components/home/CTASection';


export default function Home() {
  return (
    <div className="gradient-bg">
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <TestimonialsPreview />
      <CTASection />
    </div>
  );
}