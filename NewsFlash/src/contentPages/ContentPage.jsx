import NewsCard from "../Components/NewsCard"
import "../app.css"
import React, { useEffect, useState } from 'react'
import SideBar from "../Components/SideBar"
import axios from "axios"
import RefreshButton from "../Components/RefreshButton"

export default function ContentPage({ category }) {
    const [request, setRequest] = useState({ quantity: "10", type: "catered" })

    useEffect(() => {
        document.body.className = 'body-app';
    })

    //Retrieve json for 10 articles
    useEffect(() => {
        (async () => {
            try {
                const status = await axios.post('http://localhost:5000/search_articles_category', {category})
                const articles = await axios.get('http://localhost:5000/get_articles_category').then(res => {
                    const yourSavedData = res.data;
                    console.log(yourSavedData)
                },)

                console.log(articles)
            } catch (error) {
                console.error(error.response.data)
            }

        })
    })

    return (
        <div className="container">
            <SideBar />
            <div className="news-pane">
                <div className="flex-row">
                    <h1 style={{ margin: "3rem 2rem" }}>{category}</h1>
                    <RefreshButton />
                </div>

                <hr />

                <NewsCard
                    img="https://media.cnn.com/api/v1/images/stellar/prod/230826223216-jorge-vilda-luis-rubiales-082023.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp"
                    categories={["Sports", "Entertainment"]}
                    title="Soccer world rallies behind Jenni Hermoso to leave Luis Rubiales looking increasingly isolated"
                    shortText="Spain’s Women’s World Cup-winning coach Jorge Vilda on Saturday has criticized the 
                    “inappropriate” behavior of suspended football federation president Luis Rubiales, whose forced..."
                    summary="Spain's Women’s World Cup-winning coach, Jorge Vilda, criticized suspended football federation president Luis Rubiales for his 'inappropriate' behavior of forcibly kissing player Jennifer Hermoso at the World Cup final. Rubiales's refusal to resign has caused a crisis in Spanish soccer, leading to FIFA suspending him for 90 days and triggering the resignation of most of Spain's women's team. Hermoso expressed her discomfort and lack of consent regarding the kiss. Soccer teams globally showed solidarity for Hermoso, and even male teams supported her. The dispute has gained attention, with Barcelona manager Xavi condemning Rubiales's behavior and expressing support for Hermoso."
                />

                <NewsCard
                    img="https://static01.nyt.com/images/2023/08/24/multimedia/00china-us-econ-02-fctw/00china-us-econ-02-fctw-jumbo.jpg?quality=75&auto=webp"
                    categories={["Business", "World"]}
                    title="What China’s Economic Woes May Mean for the U.S."
                    shortText="The country’s growth has fallen from its usual brisk 8 percent annual pace to more like 3 percent. 
                    Real estate companies are imploding after a decade of overbuilding..."
                    summary="China's economy has been facing challenges, including slowed growth and collapsing real estate companies. 
                    The impact on the US economy seems minor for now due to China's limited role as a customer for American goods and 
                    the small connections between their financial systems. A 'hard landing' scenario for China's economy could slightly
                     affect the US, but deeper collapse would have more significant repercussions. While the current situation doesn't 
                     strongly influence the US outlook, a worsening Chinese economy could change the dynamics. The US-China economic 
                     relationship has shifted with reduced American consumption from China and lower Chinese demand for US exports."
                />

                <NewsCard
                    img="https://globalnews.ca/wp-content/uploads/2023/01/GettyImages-1246191545.jpg?quality=85&strip=all"
                    categories="Entertainment"
                    title="Take a sneak-peek tour of Super Nintendo World, opening next month"
                    shortText="In exactly four weeks, Super Nintendo World will open at Universal Studios Hollywood and it looks to be any classic gamer’s dream come true...."
                    summary="Super Nintendo World is set to open at Universal Studios Hollywood in four weeks, offering an immersive environment that recreates the world of classic Nintendo games. The park features an entrance through a green warp tube leading to the Mushroom Kingdom, complete with pixelated cliffs, question mark blocks, and iconic elements from the Super Mario Bros. games. Inside, guests can explore rooms themed to Yoshi's Story and Super Stars before heading to Bowser's Castle. The main attraction is the augmented reality ride/game 'Mario Kart: Bowser's Challenge,' where visitors wear visors to interact with virtual items and compete against Team Bowser for the Golden Cup. The park also offers interactive games, challenges, and themed food options. It is set to open on February 17."
                />
            </div>
        </div>
    )
}