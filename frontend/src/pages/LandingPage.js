import React, { useEffect } from 'react';
import {Button} from 'react-bootstrap';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Landing(props) {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('JWT') !== null){
      navigate("/profile");
    }
  },[])

  return (
    <div>
      <h1 className='pageTitle'>Welcome!</h1>   
      <Button onClick={(e)=>props.login(e)} className="btnLogin">
        <img
          style={{ width: "30px", height: "30px", padding: "5px", marginRight: "10px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
        />
        Log In With Google
      </Button>   
    </div>
  );
}