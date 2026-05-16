import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4EFE8' }}>
      <Navbar />
      <main className="flex-1 pt-[65px]">{children}</main>
      <Footer />
    </div>
  );
}
