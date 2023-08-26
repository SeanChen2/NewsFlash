import NavBar from "./Navbar"
import "./styles.css"
import Home from "./pages/Home"
import {Route, Routes} from "react-router-dom"

export default function App() {
  return (
    <>
    <NavBar />
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
    </Routes>
    </>
  )
}