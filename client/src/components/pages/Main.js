import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from '../Profile';
import { LoginPage } from './LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../Navbar';
import blackListyLogo from '../pictures/listyLogoBlack.svg'
import { LogoNavbar } from '../LogoNavbar';


export const Main = () => {

const { isLoading, error, isAuthenticated } = useAuth0();




  return (
      <BrowserRouter>
    <main className='main'>

      {/* <nav className='nav-top'><img className='black-listy-nav-logo' src={blackListyLogo} /></nav> */}
      <nav className='nav-top'><LogoNavbar /></nav>


      <section className='main-content'>

  
      
      
        <Routes>
          {/* <Route path='/' element={</>} /> */}
          <Route path='/' element={<LoginPage />} />
          {/* <Route path='/feed' element={<MainFeed />} /> */}
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/add' element={<Add />} /> */}

        </Routes>


      </section>

      <nav className='nav-bottom'><Navbar /></nav>

      
    
    

    {/* 
    Commenting out the call API buttons
    
    <ul><button onClick={callApi}>Call API route</button></ul>
    <ul><button onClick={callProtectedApi}>Call Protected API route</button></ul>
    
  */}

  
  
      
    </main>
  </BrowserRouter>
  )
}
