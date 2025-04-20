import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { MainNav } from "@/components/main-nav";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-red-700 hover:bg-red-800">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
