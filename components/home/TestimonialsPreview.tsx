import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Austin, TX',
    service: 'Plumbing Service',
    rating: 5,
    comment: 'Excellent service! The technician arrived on time and fixed our plumbing issue quickly. Very professional and fair pricing.',
    initial: 'SJ',
  },
  {
    name: 'Mike Chen',
    location: 'Seattle, WA',
    service: 'Roofing Repair',
    rating: 5,
    comment: 'Outstanding work on our roof repair. The team was efficient, clean, and the quality of work exceeded our expectations.',
    initial: 'MC',
  },
  {
    name: 'Emily Davis',
    location: 'Denver, CO',
    service: 'Bathroom Remodeling',
    rating: 5,
    comment: 'Our bathroom looks amazing! The remodeling process was smooth and the final result is exactly what we wanted.',
    initial: 'ED',
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="text-sm text-primary">{testimonial.service}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/testimonials">
            <Button size="lg" variant="outline">
              Read More Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}