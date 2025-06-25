'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services } from '@/lib/data/services';
import { Clock, Star, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ServicesGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="service-card-hover group h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    {service.emergencyAvailable && (
                      <Badge variant="destructive" className="text-xs">
                        24/7 Emergency
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.longDescription}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration: {service.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 mr-2" />
                      Category: {service.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Services Include:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="h-3 w-3 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-xl font-bold text-primary">
                         {service.basePrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">starting</span>
                    </div>
                    <Link href="/services/confirm">
                      <Button>
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}