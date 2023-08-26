import "../app.css"

export default function NewsCard({img, title, shortText, summary, ...props}) {
    return (
        <div className="news-card">
            <img img={img == null ? "../images/Placeholder.png" : img}/>

            <h1>Site Title</h1>
        </div>
    )
}