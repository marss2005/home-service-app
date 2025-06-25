import { Wrench, Home, Droplets, TreePine, Zap, Bath, Key, Wind } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: any;
  basePrice: number;
  duration: string;
  category: string;
  features: string[];
  emergencyAvailable: boolean;
}

export const services: Service[] = [
  {
    id: 'ac-service',
    title: 'AC Service',
    description: 'Maintenance and repair for all AC brands by experienced technicians.',
    longDescription: 'Comprehensive service for your AC including cleaning, repair, and routine maintenance. Our technicians are experienced with all AC brands and available 24/7.',
    icon: Wind,
    basePrice: 150000,
    duration: '1-2 hours',
    category: 'Electronics',
    features: ['AC Cleaning', 'Freon Refill', 'Compressor Repair', 'Routine Maintenance', 'Service Warranty'],
    emergencyAvailable: true,
  },
  {
    id: 'electrical',
    title: 'Electrical Services',
    description: 'Home electrical installation and repair with high safety standards.',
    longDescription: 'Licensed electricians for all your home electrical installation and repair needs. From simple issues to complex installations.',
    icon: Zap,
    basePrice: 100000,
    duration: '1-3 hours',
    category: 'Installation',
    features: ['Electrical Installation', 'Short Circuit Repair', 'Light Fixture Setup', 'MCB & Outlet Setup', 'Free Consultation'],
    emergencyAvailable: true,
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'Repair and installation of water pipes, drainage, and sanitation systems.',
    longDescription: 'Complete solutions for all your home plumbing and sanitation problems. Experienced technicians with modern equipment.',
    icon: Droplets,
    basePrice: 120000,
    duration: '1-3 hours',
    category: 'Sanitation',
    features: ['Leak Repair', 'New Pipe Installation', 'Clogged Drain Solutions', 'Faucet Installation', 'Emergency Services'],
    emergencyAvailable: true,
  },
  {
    id: 'appliance-repair',
    title: 'Appliance Repair',
    description: 'Repair and maintenance of household electronic appliances.',
    longDescription: 'Expert technicians for repairing various appliances like refrigerators, washing machines, TVs, and more.',
    icon: Wrench,
    basePrice: 80000,
    duration: '1-2 hours',
    category: 'Electronics',
    features: ['Refrigerator Repair', 'Washing Machine Repair', 'TV Service', 'Microwave Repair', 'Spare Part Warranty'],
    emergencyAvailable: false,
  },
  {
    id: 'bathroom-renovation',
    title: 'Bathroom Renovation',
    description: 'Complete bathroom renovation and repair with modern design.',
    longDescription: 'Comprehensive bathroom renovation service from design consultation to final finishing. We use high-quality materials.',
    icon: Bath,
    basePrice: 5000000,
    duration: '3-7 days',
    category: 'Renovation',
    features: ['Design Consultation', 'Tile Installation', 'Sanitary Fittings', 'Waterproofing', 'Workmanship Guarantee'],
    emergencyAvailable: false,
  },
  {
    id: 'locksmith',
    title: 'Locksmith Services',
    description: 'Lock and home security experts for all key-related issues.',
    longDescription: '24/7 professional locksmith service for lockouts, new lock installations, and security system upgrades.',
    icon: Key,
    basePrice: 75000,
    duration: '30 minutes - 1 hour',
    category: 'Security',
    features: ['Emergency Lockout', 'Lock Replacement', 'Key Duplication', 'Padlock Installation', 'Security Consultation'],
    emergencyAvailable: true,
  },
  {
    id: 'home-maintenance',
    title: 'Home Maintenance',
    description: 'General maintenance and repair services to keep your home in top shape.',
    longDescription: 'Routine maintenance and small repairs to keep your home in optimal condition. From wall painting to furniture fixes.',
    icon: Home,
    basePrice: 90000,
    duration: '1-4 hours',
    category: 'Maintenance',
    features: ['Wall Painting', 'Furniture Repairs', 'Door/Window Care', 'Gutter Cleaning', 'Routine Inspection'],
    emergencyAvailable: false,
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};