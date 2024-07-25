

export default function PriceCard() {
  const planName = 'Standard';
  const price = 15;
  const features = [
    { name: 'doIt todo list', available: true },
    { name: 'Barinstorm Ai', available: true },
    { name: 'Early access to new features', available: true },
    { name: 'Priority Support', available: true },
  ];

  return (
    <div className="w-full mb-8 lg:mb-0 mx-auto max-w-full md:max-w-[380px] ">
      <div className=" md:max-w-sm lg:max-w-none mx-auto pt-10 px-10 pb-8 bg-white rounded-3xl shadow-lg">
        <div className="text-center mb-6">
          <h5 className="text-2xl font-semibold text-gray-800 mb-3">{planName}</h5>
          <span className="block text-5xl font-bold text-gray-800 mb-3">${price}</span>
          <span className="block text-gray-600 font-medium mb-6">/per month</span>
          <a
            href="#"
            className="relative group inline-block w-full py-4 px-6 text-center text-white hover:text-gray-300 bg-slate-800 font-semibold rounded-full overflow-hidden transition duration-200"
          >
            <div className="absolute top-0 right-full w-full h-full bg-[#1F2937] transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
            <span className="relative">Get Started</span>
          </a>
        </div>
        <ul>
          {features.map((feature, index) => (
            <li key={index} className={`flex mb-4 items-center ${feature.available ? 'text-gray-800' : 'text-gray-500 line-through'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`w-6 h-6 fill-current ${feature.available ? 'text-gray-800' : 'text-gray-500'}`}
              >
                <path
                  d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"
                ></path>
              </svg>
              <span className="ml-2">{feature.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
