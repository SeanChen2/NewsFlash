import "../styles.css"
import StartNowBtn from "../Components/StartNowBtn"

export default function Mission() {
    return (
        <>
            <section className="content-right" id="mission" style={{ marginTop: "30rem" }}>
                <img src="../images/Blue Circle.png" className="bg-circle"
                    style={{ top: "-3rem", left: "0rem", width: "900px", height: "900px" }} />

                <img src="../images/Blue Circle.png" className="bg-circle"
                    style={{ top: "-8rem", left: "-100rem", width: "900px", height: "900px" }} />

                <img src="../images/News Stress.png" className="news-stress" />

                <h1 className="big-text" style={{ textAlign: "right", paddingRight: "1.5rem" }}>
                    Our Mission
                </h1>

                <p className="small-text" style={{ textAlign: "right", paddingRight: "1.5rem" }}>
                    Keeping up with the news can be a tedious process. One must scour various news sources
                    and read thousands of words before they are caught up with the latest events. Here at
                    NewsFlash, we believe everyone deserves to be well informed - no matter how busy their
                    lifestyle is.
                    <br /><br />
                    Using our app, you can read the latest articles from thousands of reputable news sources,
                    and generate concise summaries to speed things up. Staying knowledgeable just got a whole
                    lot easier.
                </p>

                <StartNowBtn style={{ left: "31rem" }}>Try it out!</StartNowBtn>
            </section>
        </>
    )
}