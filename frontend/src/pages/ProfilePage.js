import React, {useState, useEffect} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner, Image } from 'react-bootstrap';

export default function Profile(props) {
  const [auth, setAuth]=useState(null);
  const [isLoading, setIsLoading]=useState(true);
  const navigate = useNavigate();
  const fetchUser = props.fetchUser;

  useEffect(()=>{
    if(localStorage.getItem('JWT')==null){
      return navigate("/");
    }
    else{
      // get user google info by taking jwt_key in local storage and calling user endpoint
      setAuth(fetchUser());
        setTimeout(()=>{
          setIsLoading(false);
        }
      ,2000);
    }
  },[])
  
  const userData = () => {
    if(!isLoading && auth) {
      return (
      <div className='profile'>
        <div className='profile-img'>
          <Image src={auth.picture} alt="profile" roundedCircle />
        </div>
        <div className='profile-info'>
          <h3>{auth.name}</h3>
          <h3>{auth.email}</h3>
          <Button className='btnLogout' onClick={()=>props.logout()}>Logout</Button>
        </div>
      </div>
      )
    } else {
      return (
        <Spinner animation="border" variant="primary" className='profile'/>
      )
    }
  }
  return (
    <div>
      <h1 className='info'>Profile</h1>
      <p>Logged in as:</p>
      {userData()}
    </div>
  );
}