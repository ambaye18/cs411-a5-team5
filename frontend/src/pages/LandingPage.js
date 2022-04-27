import React, { useEffect, useState } from 'react';
import {Button, Spinner} from 'react-bootstrap';
import './style.css';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import axios from 'axios';

export default function Landing(props) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const fetchUser = props.fetchUser;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    if(localStorage.getItem('JWT') !== null){
      setToken(localStorage.getItem('JWT'));
      setUser(fetchUser());
      setTimeout(()=>{
        setIsLoading(false);
      }
      ,2000);
    }
      
  },[])

  const setUserName = () => {
    console.log(isLoading);
    console.log(user);
    if(!isLoading && user) {
      return (
        <>
        <h1 className="landingName">Welcome, {user.name.split(" ")[0]}!</h1>
        <Button className="btnLogout" onClick={()=>props.logout()}>Logout</Button>
        </>
      )
    } else {
      return (
        <Spinner animation="border" variant="primary"/>
      )
    }
  }

  return (
    <div>
      <div><img src={require("./logo1.png")} className="pageTitle" alt="Weatherify!"/></div>
      {token == null ?
      <>
      <h1 className='info'>Please log in before continuing ↓ </h1>   
      <Button onClick={(e)=>props.login(e)} className="btnLogin">
        <img
          style={{ width: "30px", height: "30px", padding: "5px", marginRight: "10px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
        />
        Log In With Google
      </Button>   
      </>
      : setUserName()}
    </div>
  );
}