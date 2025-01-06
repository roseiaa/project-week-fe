import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { handleAllArticles } from "../utils/apiCalls";

function Articles({ user, topic }) {
  const [articles, setArticles] = useState([]);
  const [sortby, setSortby] = useState("created_at");
  const [ascDesc, setAscDesc] = useState("DESC");
  const [isLoading, setLoading] = useState(false);
  const topicData = {
    football: "Football",
    cooking: "Cooking",
    coding: "Coding",
  };

  useEffect(() => {
    setLoading(true);
    if (topic) {
      handleAllArticles(setArticles, sortby, ascDesc, topic.slug)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      handleAllArticles(setArticles, sortby, ascDesc)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [topic, sortby, ascDesc]);

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
      <label htmlFor="sortby">Sort by:</label>
      <select
        onChange={(e) => {
          setSortby(e.target.value);
        }}
        name="sortby"
        id="sortby"
      >
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>
      <label htmlFor="order">Order by:</label>
      <select
        onChange={(e) => {
          setAscDesc(e.target.value);
          console.log(e.target.value);
        }}
        name="order_by"
        id="order_by"
      >
        <option value="DESC">Descending</option>
        <option value="ASC">Ascending</option>
      </select>

      <hr />
      {isLoading ? (
        <p>Loading...</p> // Loading indicator
      ) : (
        <ul id="article-container">
          {articles.map((article, index) => (
            <li className="article-card" key={index}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Articles;
