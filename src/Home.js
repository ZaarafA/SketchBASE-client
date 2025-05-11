// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-main">
        <Sidebar />
        <div className="home-content">
          <div className="banner">
            <img src="/Group23.png" alt="SketchBase Banner" />
          </div>
          <Link to="/search" className="search-bar">
              <input type="text" placeholder="SEARCH" readOnly />
              <button />
          </Link>
          <div className="explore">
            <p>Explore:</p>
            <div className="home-image-cards">
              {/* image data and links */}
              <div className="home-image-card">
                <img src="/gd.png" />
                <p>Graphic Design</p>
              </div>
              <div className="home-image-card">
                <img src="/portrait.png"/>
                <p>Portraits</p>
              </div>
              <div className="home-image-card">
                <img src="/ld.png"/>
                <p>Logo Design</p>
              </div>
              <div className="home-image-card">
                <img src="/ca.png" />
                <p>Comic Art</p>
              </div>
              <div className="home-image-card">
                <img src="/pixel.png" />
                <p>Pixel Art</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
