import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Phone, Mail, MapPin, Clock, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">Bintaro Home Service</span>
            </Link>
            <p className="text-sm">
              Professional technician services for home repairs and maintenance in the Bintaro area and surroundings. 
              Available 24/7 for all your home service needs.
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm ml-2">4.9/5 Customer Rating</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">AC Service</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Electrical Service</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Plumbing Service</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Electronic Repair</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Bathroom Renovation</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Locksmith Service</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Home Maintenance</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/confirm" className="hover:text-primary transition-colors">Book Service</Link></li>
              <li><Link href="/status" className="hover:text-primary transition-colors">Service Status</Link></li>
              <li><Link href="/completed" className="hover:text-primary transition-colors">Completed Services</Link></li>
              <li><Link href="/testimonials" className="hover:text-primary transition-colors">Customer Testimonials</Link></li>
              <li><Link href="/payment" className="hover:text-primary transition-colors">Payment Methods</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(021) 7542-8899</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@bintarohomeservice.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Serving Bintaro & Surroundings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
            <Button className="w-full">
              Emergency Service
            </Button>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2025 Bintaro Home Service. All rights reserved. Professional technician services you can trust.</p>
        </div>
      </div>
    </footer>
  );
}