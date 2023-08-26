import NewsCard from "../Components/NewsCard"
import "../app.css"
import React, { useEffect } from 'react';
import SideBar from "../Components/SideBar";

export default function ContentPage({category}) {
    useEffect(() => {
        document.body.className = 'body-app';
    })

    return (
        <div className="container">
            <SideBar />
            <div className="news-pane">
                <NewsCard
                    img={null}
                    category="Sports"
                    title="Site title 1"
                    shortText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Quisque sodales dui et lacinia pharetra. Curabitur maximus lacus nec molestie..."   
                    summary="Lorem ipsum is a Latin text placeholder."
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