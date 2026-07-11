import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Aurora Background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
      </div>

      {/* Grid Overlay */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Noise texture */}
      <div className="noise" aria-hidden="true" />

      {/* Content */}
      <Navbar />
      <Hero />

      {/* Section divider */}
      <div className="divider" />

      <Features />

      <div className="divider" />

      <HowItWorks />

      <div className="divider" />

      <Testimonials />

      <div className="divider" />

      <FAQ />

      <Footer />
    </main>
  );
}
