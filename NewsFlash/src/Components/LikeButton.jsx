import {useState} from "react"

export default function LikeButton({json, ...props}) {
    const [liked, setLiked] = useState(false)

    function handleLike() {
        setLiked(!liked)
    
        try {
            const response = axios.post('https://localhost/update', json)
        } catch(error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <button className="like-button" onClick={() => handleLike()} {...props}>
                <img src={liked ? "../images/Filled Heart.png" : "../images/Empty Heart.png"}/>
            </button>
        </>
    )
}