import {Link} from "react-router-dom"

export default function StartNowBtn({children, ...props}) {
    return (
        <Link to="/app">
            <button className="start-now-btn"  {...props}>
                {children}
            </button>
        </Link>
    )
}