import "./styles.css"
import Home from "./homePages/Home"
import Mission from "./homePages/Mission"
import About from "./homePages/About"
import Contact from "./homePages/Contact"
import {Route, Routes} from "react-router-dom"

export default function App() {
  return (
    <>
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mission" element={<Mission/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  )
}