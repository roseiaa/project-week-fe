import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Articles from './Components/Articles'
import { Routes, Route, Link } from "react-router-dom";
import Article from './Components/Article'


function App() {
  

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Articles/>}></Route>
        <Route path="/articles/:article_id" element={<Article/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
