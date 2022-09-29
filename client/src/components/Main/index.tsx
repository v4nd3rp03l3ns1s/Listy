import { useAuth0 } from '@auth0/auth0-react'
import Profile from '../Profile';
import { LoginPage } from '../LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { LogoNavbar } from '../LogoNavbar';
import { MainFeed } from '../MainFeed';
import { SearchPage } from '../SearchPage';


export const Main = () => {
  const { isLoading, isAuthenticated, logout, loginWithRedirect, getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();

  return (
    <BrowserRouter>
      <nav className='nav-top'>
        <LogoNavbar isAuthenticated={isAuthenticated} logout={logout} />
      </nav>
      <section className='main-content'>
        <Routes>
          <Route path='/' element={<LoginPage isLoading={isLoading} isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} />} />
          <Route path='/register' element='' />
          <Route path='/profile/:username' element='' />
          <Route path='/mainfeed' element={<MainFeed />} />
          <Route path='/search' element={<SearchPage isLoading={isLoading} isAuthenticated={isAuthenticated}/>} />
          <Route path='/profile' element={<Profile user={user} isAuthenticated={isAuthenticated} getAccessTokenSilently={getAccessTokenSilently} getAccessTokenWithPopup={getAccessTokenWithPopup} />} />
        </Routes>
      </section>
      <footer className='nav-bottom'><Navbar isAuthenticated={isAuthenticated}/></footer>
    </BrowserRouter>
  )
}
