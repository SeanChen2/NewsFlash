import NewsCard from "../Components/NewsCard"
import "../app.css"
import React, { useEffect, useState } from 'react'
import SideBar from "../Components/SideBar"
import axios from "axios"
import RefreshButton from "../Components/RefreshButton"

export default function ContentPage({category}) {
    const [request, setRequest] = useState({quantity: "10", type: "catered"})

    useEffect(() => {
        document.body.className = 'body-app';
    })

    //Retrieve json for 10 articles
    useEffect(() => {
        (async () => {
            try {
                const newsData = axios.post("/api/get_new_articles", request)
            } catch (error) {
                console.error("Error:", error)
            }
        })
    })

    return (
        <div className="container">
            <SideBar />
            <div className="news-pane">
                <div className="flex-row">
                    <h1 style={{margin: "3rem 2rem"}}>{category}</h1>
                    <RefreshButton/>
                </div>

                <hr/>

                <NewsCard
                    img={null}
                    categories={["Sports", "Entertainment"]}
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
                    categories="Entertainment"
                    title="Site title 2"
                    shortText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Quisque sodales dui et lacinia pharetra. Curabitur maximus lacus nec molestie..."   
                    summary="Lorem ipsum is a Latin text placeholder."
                />

                <NewsCard
                    img={null}
                    categories="Business"
                    title="Site title 3"
                    shortText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Quisque sodales dui et lacinia pharetra. Curabitur maximus lacus nec molestie..."   
                    summary="Lorem ipsum is a Latin text placeholder."
                />
            </div>
        </div>
    )
}