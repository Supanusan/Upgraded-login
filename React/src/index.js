import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App2 from './App2';
import Main from './Main';
import Create from './Create';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/app' element={<App2 />} />
      <Route path='/main' element={<Main />} />
      <Route path='/create' element={<Create />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
