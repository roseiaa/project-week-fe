import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { handleAllArticles } from "../utils/apiCalls";

function Articles({ user, topic }) {
  const [articles, setArticles] = useState([]);
  const topicData = {
    football: "Football",
    cooking: "Cooking",
    coding: "Coding",
  };

  useEffect(() => {
    if (topic) {
      handleAllArticles(setArticles, topic.slug);
    } else {
      handleAllArticles(setArticles);
    }
  }, [topic]);

  return (
    <main>
      {topic ? (
        <>
          <h2>{topicData[topic.slug]}</h2>
          <p>{topic.description}</p>
        </>
      ) : (
        <h2>Articles</h2>
      )}
      <form action="">
        <select name="" id="">
            <option value=""></option>
        </select>
      </form>
      <ul id="article-container">
        {articles.map((article, index) => {
          return (
            <li className="article-card" key={index}>
              {" "}
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Articles;
