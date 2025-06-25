import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bintaro Home Service - Layanan Teknisi Terpercaya',
  description: 'Layanan teknisi profesional untuk perbaikan rumah di Bintaro dan sekitarnya. Servis AC, listrik, pipa, dan berbagai layanan rumah lainnya dengan teknisi berpengalaman.',
  keywords: 'teknisi bintaro, servis ac bintaro, tukang listrik bintaro, tukang pipa bintaro, perbaikan rumah bintaro, home service bintaro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}