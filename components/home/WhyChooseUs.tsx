import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Star, Users, Award, PhoneCall } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'All our technicians are officially licensed and insured for your safety and peace of mind.',
  },
  {
    icon: Clock,
    title: '24/7 Emergency Service',
    description: 'Available anytime for your urgent needs, including holidays and late nights.',
  },
  {
    icon: Star,
    title: '100% Satisfaction Guarantee',
    description: 'We are committed to delivering the best service with full customer satisfaction.',
  },
  {
    icon: Users,
    title: 'Experienced Technicians',
    description: 'Certified technicians with years of experience in their respective fields.',
  },
  {
    icon: Award,
    title: 'Guaranteed Quality',
    description: 'Using high-quality materials and professional work standards.',
  },
  {
    icon: PhoneCall,
    title: 'Free Consultation',
    description: 'Get a free estimate and consultation for your home repair needs.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Bintaro Home Service?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are committed to delivering top-quality service and building long-term relationships with customers in Bintaro and surrounding areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}