import { Link, useMatch, useResolvedPath } from "react-router-dom"   //Replaces all <a> tags
import { Link as ScrollLink } from "react-scroll"
import "./styles.css"

export default function Navbar() {
    return <nav className="nav">
        <div className="title-logo-text">
            <img src="../images/Logo.png" className="title-logo"
                style={{ width: "32px", height: "32px" }} />
            <ScrollLink activeClass="active" smooth spy to="home" className="site-title">NewsFlash</ScrollLink>
        </div>

        <ul>
            <NavBtn to="home">Home</NavBtn>
            <NavBtn to="mission">Mission</NavBtn>
            <NavBtn to="about">About</NavBtn>
            <NavBtn to="contact">Contact</NavBtn>
        </ul>
    </nav>
}

function NavBtn({ to, children, ...props }) {
    return (
        <li>
            <ScrollLink
                activeClass="active"
                smooth spy to={to}
                {...props}
            >{children}</ScrollLink>
        </li>
    )
}