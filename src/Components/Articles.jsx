import { useEffect, useState } from "react"
import axios from "axios"
import ArticleCard from "./ArticleCard"

function Articles() {
    const [articles, setArticles] = useState([])
    function handleApi() {
        axios.get("https://nc-news-jstr.onrender.com/api/articles")
        .then((response) => {
            setArticles(response.data.articles)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {

        handleApi()
    }, [])

    return (
        <main>
        <h2>Articles</h2>
        <ul id="article-container">
            {articles.map((article, index) => {
                return <li className="article-card" key={index}> <ArticleCard article={article}/>
              </li>
            })}
        </ul>
        </main>
    )
}


export default Articles