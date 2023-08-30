import "./styles.css"
import FullHomepage from "./FullHomepage"
import ContentPage from "./contentPages/ContentPage"
import {Route, Routes} from "react-router-dom"
import ContentPageSearch from "./contentPages/ContentPageSearch"

export default function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<FullHomepage />} />
        <Route path="/app" element={<ContentPage category="top"/>}>
        </Route>
    </Routes>
    <Routes>
      <Route path="/recommended" element={<ContentPage category="top"/>}/>
      <Route path="/business" element={<ContentPage category="business"/>}/>
      <Route path="/entertainment" element={<ContentPage category="entertainment"/>}/>
      <Route path="/environment" element={<ContentPage category="environment"/>}/>
      <Route path="/food" element={<ContentPage category="food"/>}/>
      <Route path="/health" element={<ContentPage category="health"/>}/>
      <Route path="/politics" element={<ContentPage category="politics"/>}/>
      <Route path="/science" element={<ContentPage category="science"/>}/>
      <Route path="/sports" element={<ContentPage category="sports"/>}/>
      <Route path="/tech" element={<ContentPage category="technology"/>}/>
      <Route path="/tourism" element={<ContentPage category="tourism"/>}/>
      <Route path="/world" element={<ContentPage category="world"/>}/>
      <Route path="/search" element={<ContentPageSearch/>}/>
    </Routes>
    </>
  )
}