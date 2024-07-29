import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Landing from "./pages/Landing";
import { useUser } from "@clerk/clerk-react";
import DashBoard from "./pages/DashBoard";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import Quill from "./pages/Quill";


function App() {
  const { isSignedIn } = useUser();

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isSignedIn ? <DashBoard /> : <Landing />} />
          <Route path="/about" element={!isSignedIn ? <About /> : <DashBoard />} />
          <Route path="/quill" element={<Quill />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </main>
  );
}

export default App;
