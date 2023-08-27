import {useState} from "react"
import axios from "axios"

export default function SearchBox() {
    const [searchWords, setSearchWords] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()

        if (searchWords.replace(" ", "") === "") {
            console.log("returned2")
            return
        }
        if (searchWords.split(" ").length < 1 || searchWords.split(" ").length > 5) {
            console.log("returned1")
            //ERROR MESSAGE
            return
        }

        console.log(JSON.stringify({searchWords}))
        
        try {
            const status = await axios.post('/api/search_articles_keywords', {searchWords})
            const articles = await axios.get('/api/get_articles_keywords').then(res => {
                const yourSavedData = res.data;
                console.log(yourSavedData)
            })


            console.log(articles)
        } catch (error) {
            console.error(error)
        }

        setSearchWords("")
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