import "./styles.css"
import FullHomepage from "./FullHomepage"
import ContentPage from "./contentPages/ContentPage"
import {Route, Routes} from "react-router-dom"

export default function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<FullHomepage />} />
        <Route path="/app" element={<ContentPage />} />
    </Routes>
    </>
  )
}