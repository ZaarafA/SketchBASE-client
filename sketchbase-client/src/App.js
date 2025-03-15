import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Showcase Your Art to the World</h1>
        <p>Join our community and share your creativity with others.</p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </header>

      {/* Featured Art Section */}
      <section className="featured-art">
        <h2>Featured Artworks</h2>
        <div className="art-gallery">
          <div className="art-card">
            <img src="https://via.placeholder.com/300" alt="Artwork 1" />
            <p>"Mystic Dreams" by Artist A</p>
          </div>
          <div className="art-card">
            <img src="https://via.placeholder.com/300" alt="Artwork 2" />
            <p>"Colorful Chaos" by Artist B</p>
          </div>
          <div className="art-card">
            <img src="https://via.placeholder.com/300" alt="Artwork 3" />
            <p>"Ethereal Visions" by Artist C</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Art Showcase. All rights reserved.</p>
      </footer>
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create Your Account</h1>
        <p>Join our community and start showcasing your art today.</p>
        <form>
          <input type="text" placeholder="Enter your name" required />
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Create a password" required />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;