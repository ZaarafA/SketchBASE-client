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
            <img src="https://res.cloudinary.com/dt1uihx5y/image/upload/v1747535007/Group23_jj9wdh.png" alt="SketchBase Banner" />
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
                <img src="https://res.cloudinary.com/dt1uihx5y/image/upload/v1745026746/pnr1xtavehdsqegadc9p.png" />
                <p>Graphic Design</p>
              </div>
              <div className="home-image-card">
                <img src="https://res.cloudinary.com/dt1uihx5y/image/upload/v1745248380/loznugpdoq79ewm2yhqd.png"/>
                <p>Portraits</p>
              </div>
              <div className="home-image-card">
                <img src="https://res.cloudinary.com/dt1uihx5y/image/upload/v1744955771/ut5vso7z1wnamgwikh02.png"/>
                <p>Logo Design</p>
              </div>
              <div className="home-image-card">
                <img src="https://res.cloudinary.com/dt1uihx5y/image/upload/v1744948080/hfe08jy7mi0zynw2hctt.png" />
                <p>Comic Art</p>
              </div>
              <div className="home-image-card">
                <img src="https://res.cloudinary.com/dt1uihx5y/image/upload/v1745248192/en8aasi0qdngwza2mb3k.png" />
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
