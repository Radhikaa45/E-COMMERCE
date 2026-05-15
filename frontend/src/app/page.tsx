import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import BestsellerSection from '@/components/BestsellerSection';
import HeritageSection from '@/components/HeritageSection';
import GiftBoxSection from '@/components/GiftBoxSection';
import AISection from '@/components/AISection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F4EFE8' }}>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <BestsellerSection />
      <HeritageSection />
      <GiftBoxSection />
      <AISection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
