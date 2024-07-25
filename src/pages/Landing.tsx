import Hero from "../components/Hero/Hero";
import CtaMail from "../components/layout/CtaMail";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PricingCards from "../components/ui/PricingCards";
import ScreenOfApp from "../components/ui/ScreenOfApp";

export default function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ScreenOfApp />
      <PricingCards />
      <CtaMail />
      <Footer />
    </main>
  );
}
