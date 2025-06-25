

export interface Technician {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  completedJobs: number;
  avatar: string;
  available: boolean;
  hourlyRate: number;
  experience: string;
  certifications: string[];
  area: string;
}

export const technicians: Technician[] = [
  {
    id: 'tech-001',
    name: 'Budi Santoso',
    specialty: ['ac-service', 'electrical'],
    rating: 4.9,
    completedJobs: 245,
    avatar: 'BS',
    available: true,
    hourlyRate: 85000,
    experience: '8 tahun',
    certifications: ['Teknisi AC Bersertifikat', 'Listrik Berlisensi'],
    area: 'Bintaro Sektor 1-3',
  },
  {
    id: 'tech-002',
    name: 'Sari Wijaya',
    specialty: ['plumbing', 'bathroom-renovation'],
    rating: 4.8,
    completedJobs: 189,
    avatar: 'SW',
    available: true,
    hourlyRate: 95000,
    experience: '12 tahun',
    certifications: ['Ahli Pipa Bersertifikat', 'Renovasi Kamar Mandi'],
    area: 'Bintaro Sektor 4-7',
  },
  {
    id: 'tech-003',
    name: 'Ahmad Rizki',
    specialty: ['locksmith', 'home-maintenance'],
    rating: 4.9,
    completedJobs: 156,
    avatar: 'AR',
    available: false,
    hourlyRate: 75000,
    experience: '6 tahun',
    certifications: ['Ahli Kunci Profesional', 'Perawatan Rumah'],
    area: 'Bintaro Sektor 8-9',
  },
  {
    id: 'tech-004',
    name: 'Dewi Lestari',
    specialty: ['bathroom-renovation', 'plumbing'],
    rating: 4.9,
    completedJobs: 98,
    avatar: 'DL',
    available: true,
    hourlyRate: 110000,
    experience: '10 tahun',
    certifications: ['Kontraktor Umum', 'Master Plumber'],
    area: 'Pondok Aren',
  },
  {
    id: 'tech-005',
    name: 'Rudi Hermawan',
    specialty: ['appliance-repair', 'electrical'],
    rating: 4.7,
    completedJobs: 312,
    avatar: 'RH',
    available: true,
    hourlyRate: 80000,
    experience: '15 tahun',
    certifications: ['Reparasi Elektronik', 'Sistem Kelistrikan'],
    area: 'Serpong',
  },
  {
    id: 'tech-006',
    name: 'Indra Gunawan',
    specialty: ['ac-service', 'appliance-repair'],
    rating: 4.8,
    completedJobs: 203,
    avatar: 'IG',
    available: true,
    hourlyRate: 90000,
    experience: '9 tahun',
    certifications: ['Teknisi AC & Kulkas', 'Elektronik Rumah Tangga'],
    area: 'Bintaro Jaya',
  },
];

export const getTechniciansByService = (serviceId: string): Technician[] => {
  return technicians.filter(tech => 
    tech.specialty.includes(serviceId) && tech.available
  );
};

export const getTechnicianById = (id: string): Technician | undefined => {
  return technicians.find(tech => tech.id === id);
};