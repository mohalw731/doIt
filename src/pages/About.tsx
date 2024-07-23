import CtaMail from "../components/layout/CtaMail";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function About() {
  return (
    <main>
      <Navbar />

      <section className="md:py-32 py-20">
        <div className="flex flex-col gap-6 ">
          <h1 className="md:text-8xl font-bold text-5xl">
            <span id="hero-text">We’re building </span>
            <br />
            to-do list you’ll <br />enjoy using
          </h1>
          <p className="text-slate-600 md:text-2xl max-w-[600px] text-s, font-normal  ">
            Our mission with doIt is to solve current problems with to-do list
            apps by a more humane design approach and a completely natural user
            experience. <span className="text-[#b0b5ba]">
            We want to bring satisfaction to every day use of to-do
            lists and not feeling it like a chore anymore.
            </span>
          </p>
        </div>
      </section>

     <CtaMail/>
     <Footer/>
    </main>
  );
}
