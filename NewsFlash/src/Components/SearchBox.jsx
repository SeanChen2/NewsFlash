import {useState} from "react"

export default function SearchBox() {
    const [searchWords, setSearchWords] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (searchWords === "") return

        //request data using search words

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