import "./styles.css"
import FullHomepage from "./FullHomepage"
import ContentPage from "./contentPages/ContentPage"
import {Route, Routes} from "react-router-dom"

export default function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<FullHomepage />} />
        <Route path="/app" element={<ContentPage category="Recommended"/>}>
        </Route>
    </Routes>
    <Routes>
      <Route path="/recommended" element={<ContentPage category="Recommended"/>}/>
      <Route path="/business" element={<ContentPage category="Business"/>}/>
      <Route path="/entertainment" element={<ContentPage category="Entertainment"/>}/>
      <Route path="/environment" element={<ContentPage category="Environment"/>}/>
      <Route path="/food" element={<ContentPage category="Food"/>}/>
      <Route path="/health" element={<ContentPage category="Health"/>}/>
      <Route path="/politics" element={<ContentPage category="Politics"/>}/>
      <Route path="/science" element={<ContentPage category="Science"/>}/>
      <Route path="/sports" element={<ContentPage category="Sports"/>}/>
      <Route path="/tech" element={<ContentPage category="Tech"/>}/>
      <Route path="/tourism" element={<ContentPage category="Tourism"/>}/>
      <Route path="/world" element={<ContentPage category="World"/>}/>
      <Route path="/search" element={<ContentPage category="Search"/>}/>
    </Routes>
    </>
  )
}