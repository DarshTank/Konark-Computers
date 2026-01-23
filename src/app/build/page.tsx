import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SmartBuilderWizard from "@/components/SmartBuilderWizard";

export default function BuildPage() {
  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-sm font-medium mb-4">
              Smart PC Builder
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Build Your Dream PC
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our intelligent compatibility engine guides you through selecting only compatible parts. 
              No more guesswork - just a perfect build every time.
            </p>
          </div>
          
          <SmartBuilderWizard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
