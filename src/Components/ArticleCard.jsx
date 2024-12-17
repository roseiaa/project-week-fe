function ArticleCard({article}){

    return(
         <article >
             <img className="article-image" src={article.article_img_url}></img>
             <h3>{article.title}</h3>
             <p>{article.author}</p>
         </article>
    )
}

export default ArticleCard