import "../styles.css"
import StartNowBtn from "../Components/StartNowBtn"

export default function Home() {
    return (
        <>
            <div className="bg-circle-container">
                <img src="../images/Blue Circle.png" className="bg-circle"/>
            </div>

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