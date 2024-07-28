const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyAxaPupjEmVFR3dRo68ujhtopHQpN7CZC4');

// ...

// The Gemini 1.5 models are versatile and work with most use cases
 export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// ...