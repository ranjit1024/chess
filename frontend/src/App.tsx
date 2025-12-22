import "./index.css";
import { Routes,BrowserRouter, Route } from "react-router"
import Landing from "./pages/home";
import { Chess } from "./pages/chess";
import Game from "./pages/game";
export default function App() {

  return (
   
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/chess" element={<Chess/>}></Route>
      <Route path="/game" element={<Game/>}></Route>
   </Routes>
   
  );
}



