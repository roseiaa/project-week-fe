import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { handleAllArticles } from "../utils/apiCalls";

function Articles({ user, topic }) {
  const [articles, setArticles] = useState([]);
  const [sortby, setSortby] = useState("created_at");
  const [ascDesc, setAscDesc] = useState("DESC");
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const topicData = {
    football: "Football",
    cooking: "Cooking",
    coding: "Coding",
  };
  const limit = 12;
  

  useEffect(() => {
    setLoading(true);
    if (topic) {
      handleAllArticles(setArticles, sortby, ascDesc, limit, page, topic.slug)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      handleAllArticles(setArticles, sortby, ascDesc, limit, page)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [topic, sortby, ascDesc, page]);

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
        <>
        <ul id="article-container">
          {articles.map((article, index) => (
            <li className="article-card" key={index}>
              <ArticleCard article={article} />
            </li>
          ))}
          
        </ul>
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
            if(articles.length === limit) {
              return page + 1
            }
            else {
              return page
            }
          })
        }}>Next</button>
        </section>
        </>
      )}
    </main>
  );
}

export default Articles;
