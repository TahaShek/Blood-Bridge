import { HeroSection } from "@/components/hero-section";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
      <div>
        <HeroSection />
        <Features />
        <HowItWorks />
        <Testimonials />
      </div>
  );
}
