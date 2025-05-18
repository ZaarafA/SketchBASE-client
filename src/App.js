import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Search from './Search';
import Login from './Login';
import Signup from './Signup';
import Messages from './Messages';
import TestBench from './TestBench';
import Portfolio from './Portfolio';
import Services from './Services';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/test" element={<TestBench />} />
        <Route path="/profile/:userId/portfolio" element={<Portfolio />} />
        <Route path="/profile/:userId/services" element={<Services />} />
        </Routes>
    </Router>
  );
}

export default App;
