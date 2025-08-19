import AboutSection from "@/components/AboutSection";
import CarouselSlide from "@/components/CarouselSlide";
import Contact from "@/components/Contact";
import HerSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";

export default function Home() {
  return (
    <main className="bg-[#0D0D0D] w-screen overflow-hidden">
      <HerSection />
      <ServiceSection />
      <AboutSection />
      <CarouselSlide />
      <Contact />
    </main>
  );
}
