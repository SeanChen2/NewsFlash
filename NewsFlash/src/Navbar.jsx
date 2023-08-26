import {Link, useMatch, useResolvedPath} from "react-router-dom"   //Replaces all <a> tags
import "./styles.css"

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">NewsFlash</Link>

        <ul>
            <NavBtn to="/home">Home</NavBtn>
            <NavBtn to="/about">About</NavBtn>
            <NavBtn to="/contact">Contact</NavBtn>
        </ul>
    </nav>
}

function NavBtn({ to, children, ...props }) {
    //This function turns relative paths to absolulte paths
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
                                                            //must completely match
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}