import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { NavbarComponents } from './components';
import Login from './pages/Login';  
import Home from './pages/Home';  
import Profile from './pages/Profile';  
import Success from './pages/Success';  

const AppWrapper = () => {
  const location = useLocation();  

  const shouldShowNavbar = location.pathname !== '/';

  return (
    <>
      {shouldShowNavbar && <NavbarComponents />}  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
};

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    );
  }
}
