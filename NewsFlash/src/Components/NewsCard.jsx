import "../app.css"
import axios from 'axios'
import LikeButton from "./LikeButton"

export default function NewsCard({json, img, title, shortText, summary, ...props}) {
    return (
        <div className="news-card-row" {...props}>
            <img className="news-image" src={img == null ? "../images/Photo Placeholder.png" : img}/>

            <div className="news-card-col">
                <h1>{title}</h1>
                <p className="news-short-text">
                    {shortText}
                </p>
            </div>

            <LikeButton json={json}/>

        </div>
    )
}

const handleSubmit = async event => {
    event.preventDefault();

    try {
        const response = await axios.post('https://localhost/update', json)
    } catch(error) {
        console.error('Error:', error)
    }
}