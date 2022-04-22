import React from 'react';
import UserForm from '../components/UserForm';
import './style.css';

export default function Search() {
  return (
    <div>
      <h1 className='pageTitle'>Weather-Playlist Search</h1>
      <UserForm />
    </div>
  );
}