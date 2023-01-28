import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkUser } from '../Auth/userSlice';
import LandingPage from '../LandingPage/LandingPage';
import { RootState, useAppDispatch } from '../store';
import './App.css';
import { Navigate } from 'react-router-dom';



function App() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
    console.log('AUTH: ', isAuth);
  }, [dispatch, isAuth]);

  return (
    <div className="App">
      {isAuth ? <Navigate to="/dashboard" /> : <LandingPage />}
    </div>
  );
}

export default App;
