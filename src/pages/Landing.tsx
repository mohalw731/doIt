import Hero from "../components/Hero/Hero";
import CtaMail from "../components/layout/CtaMail";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function Landing() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <CtaMail/>
      <Footer/>
    </main>
  )
}
