import Header from "@/components/sections/header";
import HeroSlider from "@/components/sections/hero-slider";
import ServicesHighlights from "@/components/sections/services-highlights";
import ProcessSection from "@/components/sections/process";
import AboutExperience from "@/components/sections/about-experience";
import ClientsLogo from "@/components/sections/clients-logo";
import Footer from "@/components/sections/footer";
import FeaturedProducts from "@/components/sections/featured-products";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <HeroSlider />
      <ServicesHighlights />
      <FeaturedProducts />
      <ProcessSection />
      <AboutExperience />
      <ClientsLogo />
      <Footer />
    </main>
  );
}
