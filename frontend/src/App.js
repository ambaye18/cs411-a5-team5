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
  const [user, setUser] = useState(null);
  const [token, setToken]=useState(null);
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

  const fetchUserProfile = () => {
    const userData = {};
    const jwt_key=localStorage.getItem('JWT');
    axios.get(`http://127.0.0.1:5000/user`,
      {
        mode: 'no-cors',
        method: 'GET',
        origin: 'http://127.0.0.1:3000',
        headers : {
            Authorization: `Bearer ${jwt_key}`,
            'Content-Type':'application/json'
        }
      })
      .then((res) => {
        userData.name=res.data.name;
        userData.email=res.data.email;
        userData.picture=res.data.picture;
        // setUser(res.data);
      })
      .catch((err) => console.log(err));
    return userData;
  };

  const handleLogout=()=>{
    localStorage.removeItem('JWT')
    return navigate("/")
  }

  useEffect(()=>{
    // once user has logged in, a JWT token will be saved in local storage
    // when set, redirect to user's profile page
    if(localStorage.getItem('JWT')==null){
      const query = new URLSearchParams(window.location.search);
      const token=query.get('jwt')
      if(token){
        localStorage.setItem('JWT',token);
        setToken(token);
        // return navigate('/search');
      }
    } else {
      setToken(localStorage.getItem('JWT'));
    }
  },[])

  return (
    <div className="App">
      <NavBar/>
        <Routes>
            <Route exact path="/" element={<LandingPage login={handleLogin} logout={handleLogout} fetchUser={fetchUserProfile}/>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage fetchUser={fetchUserProfile}/>} />
            <Route path="*" exact={true} element={<PageNotFound/>} />
        </Routes>
    </div>

  );
}

export default App;
