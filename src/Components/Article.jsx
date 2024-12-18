import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";

function Article() {
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState(null);
  const params = useParams();

  function handleApi() {
    axios
      .get(
        `https://nc-news-jstr.onrender.com/api/articles/${params.article_id}`
      )
      .then((response) => {
        setArticle(response.data.article[0]);
      })
      .catch((err) => {
        console.log(err)
    });
  }

  function getComments() {
    axios.get(`https://nc-news-jstr.onrender.com/api/articles/${params.article_id}/comments`)
    .then((response) => {
        console.log(response)
        setComments(response.data.comments)
    })
  }

  useEffect(() => {
    handleApi();
    getComments();
  }, [params.article_id]);

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
                return <li  className="comment" key={comment.comment_id}> <CommentCard comment={comment}/>
              </li>
            })}
            </ul>
          </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      
    </>
  );
}

export default Article;
