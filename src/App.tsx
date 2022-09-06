import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KatasPage from './pages/KatasPage';
import KatasDetailPage from './pages/KatasDetailPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/katas' element={<KatasPage/>}/>
        <Route path='/katas/:id' element={<KatasDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
