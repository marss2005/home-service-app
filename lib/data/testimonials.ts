export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Ibu Sinta Maharani',
    location: 'Bintaro Sektor 1',
    service: 'Servis AC',
    rating: 5,
    comment: 'Pelayanan sangat memuaskan! Teknisi datang tepat waktu dan AC langsung dingin lagi. Harga juga sangat wajar. Pasti akan pakai jasa ini lagi.',
    date: '2024-12-15',
    verified: true,
  },
  {
    id: 'test-002',
    name: 'Bapak Andi Wijaya',
    location: 'Bintaro Sektor 7',
    service: 'Layanan Listrik',
    rating: 5,
    comment: 'Teknisi listriknya sangat profesional dan berpengalaman. Masalah korsleting di rumah langsung teratasi dengan rapi. Terima kasih!',
    date: '2024-12-10',
    verified: true,
  },
  {
    id: 'test-003',
    name: 'Ibu Ratna Sari',
    location: 'Pondok Aren',
    service: 'Renovasi Kamar Mandi',
    rating: 5,
    comment: 'Hasil renovasi kamar mandi sangat bagus! Sesuai dengan desain yang diminta dan dikerjakan dengan rapi. Tim sangat profesional.',
    date: '2024-12-08',
    verified: true,
  },
  {
    id: 'test-004',
    name: 'Bapak Dedi Kurniawan',
    location: 'Bintaro Sektor 9',
    service: 'Layanan Pipa',
    rating: 4,
    comment: 'Pelayanan bagus, teknisi datang cepat saat pipa bocor. Perbaikan dilakukan dengan teliti dan bersih. Harga sesuai dengan kualitas.',
    date: '2024-12-05',
    verified: true,
  },
  {
    id: 'test-005',
    name: 'Ibu Maya Putri',
    location: 'Serpong',
    service: 'Layanan Kunci',
    rating: 5,
    comment: 'Layanan darurat kunci sangat membantu! Teknisi datang dalam 30 menit dan langsung bisa membuka pintu. Sangat profesional.',
    date: '2024-12-03',
    verified: true,
  },
  {
    id: 'test-006',
    name: 'Bapak Hendra Gunawan',
    location: 'Bintaro Sektor 3',
    service: 'Perbaikan Elektronik',
    rating: 5,
    comment: 'Kulkas yang sudah rusak 2 minggu akhirnya bisa diperbaiki. Teknisinya ahli dan menjelaskan masalahnya dengan detail. Recommended!',
    date: '2024-11-28',
    verified: true,
  },
  {
    id: 'test-007',
    name: 'Ibu Lina Marlina',
    location: 'Bintaro Sektor 4',
    service: 'Perawatan Rumah',
    rating: 5,
    comment: 'Layanan perawatan rumah sangat lengkap. Dari cat tembok sampai perbaikan furniture semua dikerjakan dengan baik. Terima kasih!',
    date: '2024-11-25',
    verified: true,
  },
  {
    id: 'test-008',
    name: 'Bapak Rizki Pratama',
    location: 'Bintaro Jaya',
    service: 'Servis AC',
    rating: 4,
    comment: 'Teknisi AC nya ramah dan profesional. AC yang tadinya tidak dingin sekarang sudah normal kembali. Pelayanan memuaskan.',
    date: '2024-11-20',
    verified: true,
  },
  {
    id: 'test-009',
    name: 'Ibu Fitri Handayani',
    location: 'Bintaro Sektor 2',
    service: 'Layanan Listrik',
    rating: 5,
    comment: 'Sangat puas dengan layanan instalasi listrik tambahan. Dikerjakan rapi dan aman. Teknisinya juga memberikan tips perawatan.',
    date: '2024-11-18',
    verified: true,
  },
];

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return testimonials.filter(testimonial => 
    testimonial.service.toLowerCase().includes(service.toLowerCase())
  );
};

export const getAverageRating = (): number => {
  if (testimonials.length === 0) return 0;
  const sum = testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0);
  return Math.round((sum / testimonials.length) * 10) / 10;
};