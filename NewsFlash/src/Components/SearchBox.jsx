import {useState} from "react"
import axios from "axios"

export default function SearchBox() {
    const [searchWords, setSearchWords] = useState("")
    const [searchJson, setSearchJson] = useState({keywords:""})

    const handleSubmit = async event => {
        event.preventDefault()

        if (searchWords.replace(" ", "") === "") {
            console.log("returned")
        }
        if (searchWords.split(" ").length < 1 || searchWords.split(" ").length > 5) {
            console.log("returned")
            //ERROR MESSAGE
            return
        }

        // setSearchJson({keywords: searchWords})
        
        try {
            await axios.post('http://localhost:5000/search_articles/keywords', searchJson)
            const articles = await axios.get('http://localhost:5000/get_articles/keywords')
            console.log(articles)
        } catch (error) {
            console.error(error)
        }

        // setSearchWords("")
    }

    return (
        <form onSubmit={handleSubmit} className="search-box-form">
            <div className="form-row">
                <input 
                    value={searchWords} 
                    onChange={e => setSearchWords(e.target.value)}
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