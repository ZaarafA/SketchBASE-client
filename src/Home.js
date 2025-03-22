import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="home-main">
        <Sidebar />
        <div className="home-content">
          <div className="banner">
            <img src="/sb.jpg" alt="SketchBase Banner" />
          </div>
          <div className="search-bar">
            <input type="text" placeholder="SEARCH" />
            <button></button>
          </div>
          <div className="explore">
            <h2>EXPLORE:</h2>
            <div className="image-cards">
              {/* image data and links */}
              <div className="image-card">
                <img src="/gd.jpeg" />
                <p>Graphic Design</p>
              </div>
              <div className="image-card">
                <img src="/portrait.jpeg"/>
                <p>Portraits</p>
              </div>
              <div className="image-card">
                <img src="/ld.png"/>
                <p>Logo Design</p>
              </div>
              <div className="image-card">
                <img src="/ca.jpeg" />
                <p>Comic Art</p>
              </div>
              <div className="image-card">
                <img src="/pixel.png" />
                <p>Pixel Art</p>
              </div>
            </div>
          </div>
          <div className="user-list">
            {/* Display Users  */}
            {users.map((user) => (
              <Link to={`/profile/${user.id}`} key={user.id} className="user-link">
                <p>{user.firstName} {user.lastName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
