import "../app.css"

export default function NewsCard({img, title, shortText, summary, ...props}) {
    return (
        <div className="news-card-row" {...props}>
            <img className="news-image" src={img == null ? "../images/Placeholder.png" : img}/>

            <div className="news-card-col">
                <h1>{title}</h1>
                <p className="news-short-text">
                    {shortText}
                </p>
            </div>
        </div>
    )
}