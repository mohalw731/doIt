import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import DashBoard from "./pages/DashBoard";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useUserDetails from "./auth-functions/useUserDeatils";
import Profile from "./pages/Profile";

function App() {
  const { isLoggedIn } = useUserDetails();

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <DashBoard /> : <Landing />} />
          <Route
            path="/sign-in"
            element={isLoggedIn ? <DashBoard /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={isLoggedIn ? <DashBoard /> : <Register />}
          />
          <Route
            path="/about"
            element={!isLoggedIn ? <About /> : <DashBoard />}
          />

          <Route
            path="/profile"
            element={!isLoggedIn ? <Landing /> : <Profile />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </main>
  );
}

export default App;
