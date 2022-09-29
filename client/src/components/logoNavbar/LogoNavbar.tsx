import React from 'react'
import blackListyLogo from './pictures/listyLogoBlack.svg'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '../LogoutButton/LogoutButton';

export const LogoNavbar = () => {

  const { isAuthenticated } = useAuth0();

  return (
    <div>
      { isAuthenticated ? (
        <div>
          <img className='black-listy-nav-logo' src={blackListyLogo} />
          <LogoutButton />
        </div>
      ) : (
        null
      )}
    </div>
  )
}
