import React from 'react';
import './App.css';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';


function App() {
  return (
    <div className="App">
      <Registration />
      <Login />
    </div>
  );
}

export default App;
