import "../styles.css"

export default function Contact() {
    return (
        <>
            <div className="contact-footer" id="contact" style={{ marginTop: "50rem" }}>
                <img src="../images/Blue Circle.png" className="bg-circle"
                    style={{ top: "200rem", left: "-20rem", width: "700px", height: "700px", zIndex: "9" }} />
                <img src="../images/Blue Circle.png" className="bg-circle"
                    style={{ top: "190rem", left: "90rem", width: "700px", height: "700px", zIndex: "9" }} />
                <div className="footer-columns">
                    <div className="col">
                        <h1>Got questions?
                            <br />Get in touch with us now!</h1>
                    </div>

                    <div className="col">
                        <ul className="contact-list">
                            <ContactInfo icon="../images/Email.png">seanchen.sc2@gmail.com</ContactInfo>
                            <ContactInfo icon="../images/Phone.png">(437) 299-9798</ContactInfo>
                        </ul>
                    </div>
                </div>

                <div className="footer-below">
                    <div className="footer-credits">
                        <a href="https://www.flaticon.com/free-icons/world-globe" title="world globe icons">World globe icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Creaticca Creative Agency - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Uniconlabs - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/article" title="article icons">Article icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/stress" title="stress icons">Stress icons created by Eucalyp - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/news" title="news icons">News icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Pixel perfect - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/down-chevron" title="down chevron icons">Down chevron icons created by Icon mania - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Royyan Wijaya - Flaticon</a>
                    </div>
                    <div className="footer-copyright">
                        <p> @{new Date().getFullYear()} NewsFlash. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

function ContactInfo({ icon, children, ...props }) {
    return (
        <li className="display-horizontally">
            <img className="contact-icon" src={icon} style={{ marginRight: "1rem", position: "relative", top: "0.5rem", filter: "invert(1)" }} {...props} />
            {children}
        </li>
    )
}