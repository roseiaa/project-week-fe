import axios from "axios"
import { useState } from "react"

function CommentCard({comment}){
    const [vote, setVotes] = useState(comment.votes)
    return(
         <>
             <h3>{comment.author}</h3>
             <p>{comment.created_at}</p>
             <p className="comment-text">{comment.body}</p>
             <p className="votes">Votes: {vote}</p>
         </>
    )
}

export default CommentCard