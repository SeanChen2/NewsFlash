import "../styles.css"
import StartNowBtn from "../Components/StartNowBtn"
import NavBar from "../Navbar"

export default function Home() {
    return (
        <>
            <NavBar />

            <section className="content-left" id="home">
                <div className="logo" style={{ marginTop: "6rem" }}>
                    <img src="../images/Logo.png" className="logo-image"
                        style={{ width: "50px", height: "50px"}} />
                    <h1>NewsFlash</h1>
                </div>

                <img src="../images/Blue Circle.png" className="bg-circle"
                    style={{ top: "-30rem", left: "-25rem", width: "1200px", height: "1200px" }} />

                <img src="../images/Blue Circle.png" className="bg-circle"
                    style={{ top: "-33rem", left: "80rem", width: "1200px", height: "1200px" }} />

                <img src="../images/Global News.png" className="globe" />   

                <h1 className="big-text">
                    Thousands of reputable<br />
                    news sources. One app.
                </h1>

                <p className="small-text">
                    A free, user-friendly app that delivers
                    the most recent news from reputable sources,
                    with the ability to summarize articles into a single
                    paragraph.
                </p>

                <StartNowBtn>Start now</StartNowBtn>


            </section>
        </>
    )
}