import axios from "axios";
import { useState } from "react";
import { deleteComment } from "../utils/apiCalls";

function CommentCard({ comment }) {
  const [vote, setVotes] = useState(comment.votes);
  const voteTracker = {
    inc_votes: 1,
  };

  function addVote() {
    voteTracker.inc_votes = 1
  }
  function minusVote() {
    voteTracker.inc_votes = -1
  }

  function modifyVotes() {
    axios
      .patch(
        `https://nc-news-jstr.onrender.com/api/comments/${comment.comment_id}`,
        voteTracker
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err)
        console.log(err);
      });
  }

  return (
    <>
      <h3>{comment.author}</h3>
      <p>{comment.created_at}</p>
      <p className="comment-text">{comment.body}</p>
      <p className="votes">Votes: {vote}</p>
      <button
        className="like-button"
        onClick={() => {
          setVotes((votes) => {
            return votes + 1;
          });
          addVote();
          modifyVotes();
        }}
      >
        Like
      </button>
      <button
        className="dislike-button"
        onClick={() => {
          setVotes((votes) => {
            return votes - 1;
          });
          minusVote();
          modifyVotes();
        }}
      >
        Dislike
      </button>
      <button
        onClick={(e) => {
          console.log(comment.comment_id)
          deleteComment(comment.comment_id)
        }}
      >
        Delete
      </button>
    </>
  );
}

export default CommentCard;
