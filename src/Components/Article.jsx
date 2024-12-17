import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    handleApi();
  }, [params.article_id]);

  return (
    <>
      
      <section id="single-article-container">
        {article ? (
          <div className="single-article">
            <h3>{article.title}</h3>
            <img src={article.article_img_url} alt="Article" />
            <p>Posted: {article.created_at}</p>
            <p>{article.body}</p>
            <Link to="/">Return</Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      
    </>
  );
}

export default Article;
