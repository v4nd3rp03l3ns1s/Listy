import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../LoginButon'
import SignUpButton from '../SignUpButton';

import blackListyLogo from '../assets/listyLogoBlack.svg'

export const LoginPage = () => {

  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (

    <div>
      { !isAuthenticated ? (
        <div className='login-page'>
          <img className='black-listy-logo' src={blackListyLogo} />
          <LoginButton />
          <SignUpButton />
        </div>
      ) : (
        null
      )}
    </div>
  )
}
