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
  const [page, setPage] = useState(1)

  useEffect(() => {
    handleArticle(params, setArticle, handleLoading);
  }, [params]);

  useEffect(() => {
    getComments(params, setComments, page, handleLoading);
  }, [params, page]);


  return (
    <>
      <section id="single-article-container">
        {article ? (
          <>
            <div className="single-article">
              <h3>{article.title}</h3>
              <img src={article.article_img_url} alt="Article" />
              <p>{new Date(article.created_at).toDateString()}</p>
              <p>{article.body}</p>
              <Link to="/">Return</Link>
            </div>
            <div>
            <section id="button-container">
        <button onClick={() => {
          setPage((page) => {
            if (page > 1) {
              return page - 1
            }
            else {
              console.log("You are on the first page")
              return page = 1
            }
          })
        }}>Back</button>
        <p>{page}</p>
        <button onClick={() => {
          setPage((page) => {
            console.log(comments.length)
            if(comments.length === 6) {
              return page + 1
            }
            else {
              return page
            }
          })
        }}>Next</button>
        </section>
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
                  handleComment(params, commentData, handlePosting, setPage);
                  setCommentInput("");
                }}
                >
                Post
              </button>
            </form>
                </div>
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
