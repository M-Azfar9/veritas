import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
