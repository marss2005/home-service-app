import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data/services';
import Link from 'next/link';

export default function ServicesPreview() {
  // Show first 6 services
  const featuredServices = services.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AC servicing to complete renovations, we provide comprehensive home services with certified technicians for the Bintaro area and surroundings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="service-card-hover group">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">
                      Starting from Rp {service.basePrice.toLocaleString('id-ID')}
                    </span>
                    <Link href="/services/confirm">
                      <Button variant="outline" size="sm">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg" variant="outline">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}