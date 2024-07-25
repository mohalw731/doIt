import Hero from "../components/Hero/Hero";
import CtaMail from "../components/ui/CtaMail";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PricingCards from "../components/layout/PricingCards";

export default function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PricingCards />
      <CtaMail />
      <Footer />
    </main>
  );
}
