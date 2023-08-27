import {useState} from "react"
import axios from "axios"

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

export default function SearchBox() {
    const [keywords, setKeywords] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()

        if (keywords.split(" ").length < 1 || keywords.split(" ").length > 5) {
            console.log("returned1")
            //ERROR MESSAGE
            return
        }

        console.log(JSON.stringify({keywords: keywords}))
        
        try {
            const status = await axios.post('http://localhost:5000/search_articles_keywords', JSON.stringify({keywords: keywords}), axiosConfig)
            const articles = await axios.get('http://localhost:5000/get_articles_keywords').then(res => {
                const yourSavedData = res.data;
                console.log(yourSavedData)
            },)


            console.log(articles)
        } catch (error) {
            console.error(error.response.data)
        }

        setKeywords("")
    }

    return (
        <form onSubmit={handleSubmit} className="search-box-form">
            <div className="form-row">
                <input 
                    value={keywords} 
                    onChange={e => setKeywords(e.target.value)}
                    type="text"
                    placeholder="Search"
                />
            </div>
            <button className="mag-glass-btn">
                <img src="../images/Mag Glass.png"/>
            </button>
        </form>
    )
}