import {useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function SearchBox() {
    const [keywords, setKeywords] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault()

        if (keywords === "" || keywords.split(" ").length < 1 || keywords.split(" ").length > 5) {
            console.log("returned1")
            //ERROR MESSAGE
            return
        }

        navigate("/search", {state: {keywords: keywords}})

        setKeywords("")
    }

    return (
        <form onSubmit={handleSubmit} className="search-box-form">
            <div className="form-row">
                <input 
                    value={keywords} 
                    onChange={e => setKeywords(e.target.value)}
                    type="text"
                    placeholder="Search"
                />
            </div>
            <button className="mag-glass-btn">
                <img src="../images/Mag Glass.png"/>
            </button>
        </form>
    )
}