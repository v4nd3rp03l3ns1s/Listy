import React from 'react'
import blackListyLogo from './pictures/listyLogoBlack.svg'
import { useAuth0 } from '@auth0/auth0-react'


export const LogoNavbar = () => {

  const { isAuthenticated } = useAuth0();

  return (

  isAuthenticated && (
      <>

    
        <img className='black-listy-nav-logo' src={blackListyLogo} />
    
      </>

  )
  )
}
