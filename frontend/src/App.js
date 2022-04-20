import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';

// React front-end source: https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="*" exact={true} element={<PageNotFound/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
