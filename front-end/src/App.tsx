import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from './pages/landingpage'
import Chess from "./pages/paly";

function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/play" element={<Chess/>}/>
    </Routes>
    </BrowserRouter>
    
  </div>
}

export default App
