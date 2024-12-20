import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://nc-news-jstr.onrender.com"
  })

 export function handleAllArticles(setArticles, sortby) {
    const filterTerm = {topic: sortby}
        apiClient.get("/api/articles", {params: filterTerm} )
        .then((response) => {
            setArticles(response.data.articles)
        })
        .catch((err) => {
            console.log(err)
        })
    }
export function handleArticle(params, setArticle, handleLoading) {
    handleLoading(true)
    apiClient
      .get(
        `/api/articles/${params.article_id}`
      )
      .then((response) => {
        setArticle(response.data.article[0]);
        handleLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  export function getComments(params, setComments) {
    apiClient
      .get(
        `/api/articles/${params.article_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
      });
  }

  export function getUsers(setUsers) {
    apiClient.get(`/api/users`)
    .then((response) => {
        setUsers(response.data.users[0])
        console.log(response.data.users[0])
    })
  }

  export function handleComment(params, body, handlePosting) {
    handlePosting(true)
    apiClient.post(`/api/articles/${params.article_id}/comments`, body)
    .then((response) => {
        console.log(response)
        handlePosting(false)
    })
    .catch((err) => {
        console.log(err)
    })

  }

  export function deleteComment(comment_id) {
    apiClient.delete(`/api/comments/${comment_id}`)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
        // add error state
    })
  }

  export function handleTopics(setTopics) {
    apiClient.get(`/api/topics`)
    .then((response) => {
        setTopics(response.data.topics)
    })

  }



