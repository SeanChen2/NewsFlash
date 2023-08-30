import NewsCard from "../Components/NewsCard"
import "../app.css"
import React, { useEffect, useState } from 'react'
import SideBar from "../Components/SideBar"
import axios from "axios"
import RefreshButton from "../Components/RefreshButton"

export default function ContentPage({ category }) {
    const [request, setRequest] = useState({ quantity: "10", type: "catered" })
    const [articles, setArticles] = useState(null)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

    useEffect(() => {
        document.body.className = 'body-app';
    }, [])

    //Retrieve json for 10 articles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const status = await axios.post('http://localhost:5000/search_articles_category', JSON.stringify({category: category}), axiosConfig)
                const articlesResult = await axios.get('http://localhost:5000/get_articles_category')
                setArticles(articlesResult.data)
            } catch (error) {
                console.error(error.response.data)
            }

        }

        fetchData().catch(console.error)
    }, [category])

    return (
        <div className="container">
            <SideBar />
            <div className="news-pane">
                <div className="flex-row">
                    <h1 style={{ margin: "3rem 2rem" }}>Category: {category}</h1>
                    <RefreshButton />
                </div>

                <hr />

                {
                    /* Render a NewsCard for every article IF it has been set */
                    articles ? (articles['articles'].map((article, i) => (
                        <NewsCard
                            key={i}
                            img={article['image_url']}
                            categories={article['category']}
                            title={article['title']}
                            fullContent={article['full_content']}
                            shortText={article['content']}
                            link={article['link']}
                        />
                        )
                    )) : null   //This is where a loading icon would be placed
                }

            </div>
        </div>
    )
}