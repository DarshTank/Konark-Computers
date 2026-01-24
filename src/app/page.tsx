import Header from "@/components/sections/header";
import HeroSlider from "@/components/sections/hero-slider";
// import TaglineShowcase from "@/components/sections/tagline-showcase";
import ServicesHighlights from "@/components/sections/services-highlights";
import ProcessSection from "@/components/sections/process";
import AboutExperience from "@/components/sections/about-experience";
import OurClients from "@/components/sections/our-clients";
import Footer from "@/components/sections/footer";
import FeaturedProducts from "@/components/sections/featured-products";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <HeroSlider />
      
      <Reveal>
        <ServicesHighlights />
      </Reveal>
      
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      
      <Reveal>
        <ProcessSection />
      </Reveal>
      
      <Reveal>
        <AboutExperience />
      </Reveal>
      
      <Reveal>
        <OurClients />
      </Reveal>
      
      <Footer />
    </main>
  );
}
