import "./index.css";
import { Routes,BrowserRouter, Route } from "react-router"
import { Chess } from "./pages/chess";
import Game from "./pages/game";
import LandingPage from "./pages/home";
export default function App() {

  return (
   
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/chess" element={<Chess/>}></Route>
      <Route path="/game" element={<Game/>}></Route>
   </Routes>
   
  );
}



