import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ModernLandingPage from './pages/landingpage'

function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ModernLandingPage/>}/>
    </Routes>
    </BrowserRouter>
    
  </div>
}

export default App
