import "../app.css"
import axios from 'axios'
import LikeButton from "./LikeButton"
import SummarizePanel from "./SummarizePanel"
import {useState} from "react"

export default function NewsCard({json, img, categories, title, shortText, summary, ...props}) {
    const [showSummary, setShowSummary] = useState(false)

    function handleSummary() {
        setShowSummary(!showSummary)
        
    }

    return (
        <div className={showSummary ? "news-card-row-summary" : "news-card-row"} {...props}>
            <img className="news-image" src={img == null ? "../images/Photo Placeholder.png" : img}/>

            <div className="news-card-col">
                <p className="news-short-text">
                    Category: {typeof categories == "object" ? categories.join(", ") : categories}
                </p>

                <h1>{title}</h1>
                <p className="news-short-text">
                    {shortText}
                </p>

                <button className="summarize-button" onClick={() => handleSummary()} {...props}>
                    <img src={showSummary ? "../images/Summarize Button Down.png" : "../images/Summarize Button Up.png"}/>
                </button>

                <div className={showSummary ? "summary-show" : "summary-hide"}>
                    {summary}
                </div>
            </div>

            <LikeButton json={json}/>

        </div>
    )
}