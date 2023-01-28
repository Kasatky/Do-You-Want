import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CabinetAdmin from './CabinetAdmin/CabinetAdmin';
import './index.css';
import Main from './MainPage/Main';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/login" element={<div>LOGIN</div>} />
      <Route path="/auth/register" element={<div>REGISTER</div>} />
      <Route path="/auth/logout" element={<div>LOGOUT</div>} />
      <Route path="/admin" element={<CabinetAdmin />} />
    </Routes>
  </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
