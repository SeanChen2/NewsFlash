import {Link, useMatch, useResolvedPath} from "react-router-dom"   //Replaces all <a> tags
import {Link as ScrollLink} from "react-scroll"
import "./styles.css"

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">NewsFlash</Link>

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