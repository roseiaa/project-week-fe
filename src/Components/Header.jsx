import { Link } from "react-router-dom"
function Header({user, topics}){
    console.log(topics)
    return(
        <>
        <nav id="navbar">
         <h1>NC-News</h1>
        <Link className="link" to="/">ARTICLES</Link>
        <div className="dropdown">
        <button className="dropbtn">TOPICS
        <i className="fa fa-caret-down"></i>
        
     
    </button>
    <div className="dropdown-content">
    {topics.map((topic) => {
         return <Link key={topic.slug} className="link" to={`/topics/${topic.slug}`}>{(topic.slug).toUpperCase()}</Link>
        })}
    </div>
        </div>
        <div className="profile-display">
            <h2>{user.username}</h2>
            <img className="profile-img" src={user.avatar_url} alt="" />
        </div>
        </nav>
        <h1>NC News</h1>
        </>
    )
}

export default Header