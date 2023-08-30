import "../app.css"
import axios from 'axios'
import LikeButton from "./LikeButton"
import {useState} from "react"

export default function NewsCard({json, img, categories, title, fullContent, shortText, link, ...props}) {
    const [showSummary, setShowSummary] = useState(false)
    const [articleSummary, setArticleSummary] = useState(null)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

    function toggleSummary() {
        setShowSummary(!showSummary)    //State of showSummary will not be toggled until next render

        if (!showSummary && articleSummary == null) {

            const fetchSummary = async () => {
                try {
                    const status = await axios.post('http://localhost:5000/generate_content_summary', JSON.stringify({content: fullContent}), axiosConfig)
                    const articleSummary = await axios.get('http://localhost:5000/get_content_summary')
                    setArticleSummary(articleSummary.data)
                } catch (error) {
                    console.error(error.response.data)
                }
            }

            fetchSummary().catch(console.error)
        }
    }

    return (
        <div className={showSummary ? "news-card-row-summary" : "news-card-row"} {...props}>
            <a href={link} target="_blank">
                <img className="news-image" src={img == null ? "../images/Photo Placeholder.png" : img}/>
            </a>

            <div className="news-card-col">
                <p className="news-short-text">
                    Category: {typeof categories == "object" ? categories.join(", ") : categories}
                </p>

                <h1>{title}</h1>
                <p className="news-short-text">
                    {shortText}
                </p>

                <button className="summarize-button" onClick={() => toggleSummary()} {...props}>
                    <img src={showSummary ? "../images/Summarize Button Down.png" : "../images/Summarize Button Up.png"}/>
                </button>

                <div className={showSummary ? "summary-show" : "summary-hide"}>
                    {articleSummary ? articleSummary['summary'] : "Generating summary..."}
                </div>
            </div>

            <LikeButton json={json}/>

        </div>
    )
}