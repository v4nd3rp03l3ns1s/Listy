import React, { FunctionComponent } from 'react'
import blackListyLogo from '../assets/listyLogoBlack.svg'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '../LogoutButton/index';

interface IProps {
 isAuthenticated: boolean,
 logout: Function,
}

export const LogoNavbar: FunctionComponent<IProps> = ({isAuthenticated, logout}) => {

  // const { isAuthenticated } = useAuth0();

  return (
    <div>
      { isAuthenticated ? (
        <div>
          <img className='black-listy-nav-logo' src={blackListyLogo} />
          <LogoutButton isAuthenticated={isAuthenticated} logout={logout} />
        </div>
      ) : (
        null
      )}
    </div>
  )
}
