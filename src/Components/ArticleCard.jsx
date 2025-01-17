import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article>
      {/* <img
        className="article-image"
        src={article.article_img_url}
        alt={article.title}
      ></img>
      <Link to={{ pathname: `/articles/${article.article_id}` }}>
        <h3>{article.title}</h3>
      </Link>
      <p>Author: {article.author}</p>
      <p>Votes: {article.votes}</p> */}

      <div>
      <Link to={{ pathname: `/articles/${article.article_id}` }}>
      
        <img className="article-image" src={article.article_img_url} alt="..." />
        <div>
          <h5>{article.title}</h5>
          <p>
            Author: {article.author}
          </p>
        </div>
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
