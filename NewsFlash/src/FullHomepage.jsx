import Home from "./homePages/Home"
import Mission from "./homePages/Mission"
import About from "./homePages/About"
import Contact from "./homePages/Contact"
import "./styles.css"
import { useEffect } from "react"

export default function FullHomepage() {
    useEffect(() => {
        document.body.className = 'body-homepage';
    })

    return (
        <>
            <Home />
            <Mission/>
            <About />
            <Contact />
        </>
    )
}