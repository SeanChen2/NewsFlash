import NewsCard from "../Components/NewsCard"
import "../app.css"
import React, { useEffect, useState } from 'react'
import SideBar from "../Components/SideBar"
import axios from "axios"

export default function ContentPage({category}) {
    useEffect(() => {
        document.body.className = 'body-app';
    })

    //Retrieve json for 10 articles
    const [request, setRequest] = useState({quantity: "10", type: "catered"})
    const newsData = axios.post("http://localhost:5000/api/get_new_articles", request)

    return (
        <div className="container">
            <SideBar />
            <div className="news-pane">
                <h1 style={{margin: "2rem"}}>Recommended</h1>
                <hr className="header-line"/>

                <NewsCard
                    img={null}
                    category="Sports"
                    title="Site title 1"
                    shortText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Quisque sodales dui et lacinia pharetra. Curabitur maximus lacus nec molestie..."   
                    summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                    anim id est laborum."
                />

                <NewsCard
                    img={null}
                    category="Entertainment"
                    title="Site title 2"
                    shortText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Quisque sodales dui et lacinia pharetra. Curabitur maximus lacus nec molestie..."   
                    summary="Lorem ipsum is a Latin text placeholder."
                />

                <NewsCard
                    img={null}
                    category="Business"
                    title="Site title 3"
                    shortText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Quisque sodales dui et lacinia pharetra. Curabitur maximus lacus nec molestie..."   
                    summary="Lorem ipsum is a Latin text placeholder."
                />
            </div>
        </div>
    )
}