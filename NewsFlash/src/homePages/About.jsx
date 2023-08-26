import "../styles.css"
import StartNowBtn from "../Components/StartNowBtn"

export default function About() {
    //ADD GRAPHIC FOR APP DEMO
    return (
        <>
            <section className="content-left" id="about" style={{marginTop: "95rem"}}>
                <img src="../images/Blue Circle.png" className="bg-circle" 
                    style={{top: "0rem", left: "-10rem", width: "900px", height: "900px"}} />
                <img src="../images/App Demo.gif" className="app-demo" alt="Fungus" />

                <h1 className="big-text">
                    About NewsFlash
                </h1>

                <p className="small-text">
                    NewsFlash uses two main APIs: NewsData.io, which delivers the latest news from select sources;
                    and MeaningCloud, which summarizes each article into a concise paragraph to save your time.
                    <br/><br/>
                    On the main page, articles from various categories will be recommended to you. When you “like”
                    certain articles, similar ones will be recommended more often. You can also use the side
                    navigation bar to look through certain categories. By clicking the “Summarize” button on any
                    of the articles, you will receive a concise summary directly below.
                </p>

                <StartNowBtn style={{width: "10rem"}}>Create an account</StartNowBtn>
            </section>
        </>
    )
}