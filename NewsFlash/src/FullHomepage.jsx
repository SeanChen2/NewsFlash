import Home from "./homePages/Home"
import Mission from "./homePages/Mission"
import About from "./homePages/About"
import Contact from "./homePages/Contact"
import "./styles.css"

export default function FullHomepage() {
    return (
        <>
            <div className="homepage">
                <Home />
                <Mission/>
                <About />
                <Contact />
            </div>
        </>
    )
}