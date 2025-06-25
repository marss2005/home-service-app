import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
      <div className="relative container mx-auto px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Professional Technicians 
                <span className="text-primary"> for Your Home</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                From AC servicing, electrical, plumbing to various other home repairs. 
                Our certified technicians are ready to serve the Bintaro area and surroundings with a 100% satisfaction guarantee.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services/confirm">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-slate-900">
                <Phone className="mr-2 h-5 w-5" />
                Call (021) 7542-8899
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Service Request</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-slate-600">Emergency Service</div>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-slate-600">Satisfaction</div>
                  </div>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-accent">Certified</div>
                  <div className="text-sm text-slate-600">Professional Technicians</div>
                </div>
                <Link href="/services/confirm">
                  <Button className="w-full" size="lg">
                    Get a Free Estimate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}