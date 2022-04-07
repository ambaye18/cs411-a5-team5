import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';

// React front-end source: https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
function App() {

  return (
    <div className="App">
      <UserForm/>
    </div>
  );
}

export default App;
