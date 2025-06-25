'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';

export default function TestimonialsGrid() {
  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {testimonials.length}+
              </div>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                100%
              </div>
              <p className="text-sm text-muted-foreground">Verified Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Comment */}
                <p className="text-muted-foreground italic">
                  "{testimonial.comment}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="text-sm text-primary">{testimonial.service}</div>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-muted-foreground">
                  {new Date(testimonial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}