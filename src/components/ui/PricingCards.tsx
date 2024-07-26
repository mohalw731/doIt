import PriceCard from "../ui/PriceCard";

export default function PricingCards() {
  return (
    <div className="flex gap-5 md:flex-row flex-col py-20 " id="pricing">
      <div className="flex flex-col gap-6 ">
        <h1 className="md:text-7xl font-bold  text-4xl">
          <span id="hero-text">We’re building </span>
          <br />
          to-do list you’ll <br />
          enjoy using
        </h1>
        <p className="text-slate-600 md:text-xl max-w-[600px] text-s, font-normal  ">
          Our mission with doIt is to solve current problems with to-do list
          apps by a more humane design approach and a completely natural user
          experience.{" "}
          <span className="text-[#b0b5ba]">
            We want to bring satisfaction to every day use of to-do lists and
            not feeling it like a chore anymore.
          </span>
        </p>
      </div>
      <PriceCard />
    </div>
  );
}
