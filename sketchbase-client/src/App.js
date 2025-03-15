import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Search from './Search';

// FIREBASE CONFIG
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD1jNk4HgJsWF2zJRUA6M1IdYvMLLi1UYo",
  authDomain: "sketchbase-fae70.firebaseapp.com",
  projectId: "sketchbase-fae70",
  storageBucket: "sketchbase-fae70.firebasestorage.app",
  messagingSenderId: "6295064437",
  appId: "1:6295064437:web:dd0c1132c65aebfc934d3c",
  measurementId: "G-NEJQJHYDZX"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
