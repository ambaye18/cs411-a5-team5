import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFound from './pages/PageNotFound';
import NavBar from './components/NavBar';
import axios from 'axios';

// React front-end source: https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
function App() {
  // const [user, setUser]=useState(null);
  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`http://127.0.0.1:5000/auth/google`, {
      mode: 'no-cors',
      method: 'GET',
      origin: 'http://127.0.0.1:3000',
      headers : {
          'Content-Type':'application/json'
      }
    })
      .then((res) => {
        // open auth redirect url to log in using google
        console.log(res);
        window.location.assign(res.data.auth_url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    // once user has logged in, a JWT token will be saved in local storage
    // when set, redirect to user's profile page
    if(localStorage.getItem('JWT')==null){
      const query = new URLSearchParams(window.location.search);
      const token=query.get('jwt')
      if(token){
        localStorage.setItem('JWT',token);
        return navigate('/profile');
      }
    }
  })

  return (
    <div className="App">
      <NavBar/>
        <Routes>
            <Route exact path="/" element={<LandingPage login={handleLogin}/>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="*" exact={true} element={<PageNotFound/>} />
        </Routes>
    </div>
  );
}

export default App;
