import NewsCard from "../Components/NewsCard"
import "../app.css"
import React, { useEffect } from 'react';

export default function ContentPage() {
    useEffect(() => {
        document.body.className = 'body-app';
    })

    return (
        <>
            <NewsCard/>
        </>
    )
}