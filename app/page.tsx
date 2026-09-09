import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ReviewsSection from "@/components/ReviewsSection";
import AboutContact from "@/components/AboutContact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ReviewsSection />
        <AboutContact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
