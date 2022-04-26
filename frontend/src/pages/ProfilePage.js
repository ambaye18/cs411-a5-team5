import React, {useState, useEffect} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function Profile(props) {
  const [auth, setAuth]=useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('JWT')==null){
      return navigate("/");
    }
    else{
      // get user google info by taking jwt_key in local storage and calling user endpoint
      const jwt_key=localStorage.getItem('JWT');
      axios.get(`http://127.0.0.1:5000/user`,
        {
          mode: 'no-cors',
          method: 'GET',
          origin: 'http://127.0.0.1:3000',
          headers : {
              "Authorization": `Bearer ${jwt_key}`,
              'Content-Type':'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          setAuth(res.data)
        })
        .catch((err) => console.log(err));
      }
  },[])

  const handleLogout=()=>{
    localStorage.removeItem('JWT')
    return navigate("/")
  }

  return (
    <div>
      <h1 className='info'>Profile</h1>
      {auth ?
      <div className='profile'>
        <div className='profile-img'>
          <img src={auth.picture} alt="profile" />
        </div>
        <div className='profile-info'>
          <h3>{auth.name}</h3>
          <h3>{auth.email}</h3>
          <Button onClick={()=>handleLogout()}>Logout</Button>
        </div>
      </div>
      :
      <></>}
    </div>
  );
}