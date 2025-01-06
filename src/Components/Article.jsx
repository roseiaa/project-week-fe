import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import { handleArticle, getComments, handleComment } from "../utils/apiCalls";

function Article({ user }) {
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState(null);
  const [isLoading, handleLoading] = useState(false);
  const [isPosting, handlePosting] = useState(false);
  const params = useParams();
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    handleArticle(params, setArticle, handleLoading);
    getComments(params, setComments);
  }, [isLoading, isPosting]);

  return (
    <>
      <section id="single-article-container">
        {article ? (
          <>
            <div className="single-article">
              <h3>{article.title}</h3>
              <img src={article.article_img_url} alt="Article" />
              <p>Posted: {article.created_at}</p>
              <p>{article.body}</p>
              <Link to="/">Return</Link>
            </div>
            <div>
              <ul id="comment_container">
                {comments.map((comment) => {
                  return (
                    <li className="comment" key={comment.comment_id}>
                      {" "}
                      <CommentCard comment={comment} />
                    </li>
                  );
                })}
              </ul>
            </div>

            <form id="comment-form">
              {isPosting ? <p>posting</p> : <p></p>}
              <label className="comment-label" htmlFor="commentInput">
                Add Comment:
              </label>
              <textarea
                type="text"
                name="commentInput"
                id="commentInput"
                value={commentInput}
                onChange={(e) => {
                  setCommentInput(e.target.value);

                }}
                placeholder="comment.."
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const commentData = {
                    username: user.username,
                    body: commentInput,
                  };
                  handleComment(params, commentData, handlePosting);
                  setCommentInput("");
                }}
              >
                Post
              </button>
            </form>
          </>
        ) : isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <p>Article Not Found</p>
        )}
      </section>
    </>
  );
}

export default Article;
