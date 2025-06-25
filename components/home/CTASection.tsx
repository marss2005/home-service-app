import { Button } from '@/components/ui/button';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Don't let small problems turn into big ones. Contact us today for reliable professional home services in Bintaro and surrounding areas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/services/confirm">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Service
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 h-5 w-5" />
              Call (021) 7542-8899
            </Button>
            <Button size="lg" variant="ghost" className="text-lg px-8 py-3 text-white hover:bg-white/10">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat WhatsApp
            </Button>
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur">
            <p className="text-lg font-semibold mb-2">24/7 Emergency Services Available</p>
            <p className="text-primary-foreground/80">
               For urgent repairs that cannot be delayed, our emergency team is ready to help anytime in the Bintaro area and surroundings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}