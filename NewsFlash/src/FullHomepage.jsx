import Home from "./homePages/Home"
import Mission from "./homePages/Mission"
import About from "./homePages/About"
import Contact from "./homePages/Contact"

export default function FullHomepage() {
    return (
        <>
            <Home />
            <Mission/>
            <About />

            <Contact />
        </>
    )
}