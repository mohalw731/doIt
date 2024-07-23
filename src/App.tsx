import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"

function App() {
  return (
    <main className="">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
