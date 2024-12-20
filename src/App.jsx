import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Articles from "./Components/Articles";
import { Routes, Route, Link } from "react-router-dom";
import Article from "./Components/Article";
import { getUsers, handleTopics } from "./utils/apiCalls";

function App() {
  const [user, setUser] = useState({});
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getUsers(setUser);
    handleTopics(setTopics);
  }, []);

  return (
    <>
      <Header user={user} topics={topics} />
      <Routes>
        <Route path="/" element={<Articles user={user} />}></Route>
        <Route
          path="/articles/:article_id"
          element={<Article user={user} />}
        ></Route>
        {topics.map((topic) => {
          console.log(topic.slug, "App.Jsx")
          return (
            <Route
              key={topic.slug}
              path={`/topics/${topic.slug}`}
              element={<Articles user={user} topic={topic} />}
            ></Route>
          );
        })}

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
