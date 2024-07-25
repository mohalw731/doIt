export default function Hero() {
  return (
    <main className="md:py-32 py-20">
      <section className="flex flex-col md:gap-6 gap-4">
        <h1 className="md:text-8xl font-bold text-5xl">
          <span id="hero-text">A more humane</span> 
          <br />
          to-do list
        </h1>
        <p className="text-slate-600 md:text-2xl max-w-[550px] text-s">
        doIt is a back to basic to-do list focused on fast and delightful user experience.
        </p>

        <div className="">
          <button className="bg-[#008ffd] md:py-3 text-white md:px-6 rounded-full px-4 py-2  hover:opacity-80 md:text-lg text-sm">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
