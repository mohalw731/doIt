// import React, { useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import lol from "../../assets/doitai.png";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ChatBox = () => {
//     const { user } = useUser();
//     const [responses, setResponses] = useState<any>([]);

//     const genAI = new GoogleGenerativeAI('AIzaSyAxaPupjEmVFR3dRo68ujhtopHQpN7CZC4');

//     async function run(e) {
//       e.preventDefault();
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const prompt = "Write a story about a magic backpack.";

//         try {
//             const result = await model.generateContent(prompt);
//             const response = await result.response;
//             const text = await response.text();
//             setResponses([...responses, text]);
//         } catch (error) {
//             console.error("Error generating content:", error);
//         }
//     }

//     return (
//         <section className="flex-grow flex flex-col gap-14 overflow-y-auto pb-20">
//             {/* User text */}
//             <button onClick={run}>klick</button>
//             <div className="flex flex-col md:flex-row md:gap-5 gap-3">
//                 <img src={user?.imageUrl} alt="" className="size-8 rounded-full" />
//                 <span className="bg-slate-600 text-white px-4 py-2 rounded-xl">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem!
//                 </span>
//             </div>

//             {/* AI responses */}
//             {responses.map((response, index) => (
//                 <div key={index} className="flex flex-col md:flex-row md:gap-5 gap-3">
//                     <img src={lol} alt="" className="size-8 rounded-full" />
//                     <span className="py-2 rounded-xl">
//                         {response}
//                     </span>
//                 </div>
//             ))}
//         </section>
//     );
// };

// export default ChatBox;
