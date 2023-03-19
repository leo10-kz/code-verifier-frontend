import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import KatasDetailPage from '../pages/KatasDetailPage';
import KatasPage from '../pages/KatasPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';




function AppRoutes() {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/katas' element={<KatasPage />}/>
    <Route path='/katas/:id' element={<KatasDetailPage/>}/>
  </Routes>
  )
}

export default AppRoutes