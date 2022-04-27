import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import './style.css';

export default function Search() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('JWT')==null){
      return navigate("/");
    }
  },[])

  return (
    <div>
      <div><img src={require("./logo1.png")} className="pageTitle" alt="Weatherify!"/></div>
      {/* <h1 className='pageTitle'>Weather-Playlist Search</h1> */}
      <UserForm />
    </div>
  );
}