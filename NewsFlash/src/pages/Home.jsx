import "../styles.css"
import StartNowBtn from "../Components/StartNowBtn"
//<a href="https://www.flaticon.com/free-icons/world-globe" title="world globe icons">World globe icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Creaticca Creative Agency - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Uniconlabs - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/article" title="article icons">Article icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/stress" title="stress icons">Stress icons created by Eucalyp - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/news" title="news icons">News icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Pixel perfect - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a>

export default function Home() {
    return (
        <>
            <img src="../images/Blue Circle.png" className="bg-circle"/>
            <img src="../images/Global News.png" className="globe"/>  

            <div className="content">
                <h1 className="big-text">
                    Thousands of reputable<br/>
                    news sources. One app.
                </h1>

                <p className="small-text">
                    A free, user-friendly app that delivers
                    the most recent news from reputable sources,
                    with the ability to summarize articles into a single
                    paragraph.
                </p>

                <StartNowBtn>Start now</StartNowBtn>
            </div>
        </>
    )
}