import { FunctionComponent } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../LoginButon'
import SignUpButton from '../SignUpButton';

import blackListyLogo from '../assets/listyLogoBlack.svg'

interface IProps {
  isLoading: boolean,
  isAuthenticated: boolean,
  loginWithRedirect: Function,
 }

export const LoginPage: FunctionComponent<IProps> = ({isLoading, isAuthenticated, loginWithRedirect}) => {
  // const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      { !isAuthenticated ? (
        <div className='login-page'>
          <img className='black-listy-logo' src={blackListyLogo} />
          <LoginButton isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect}/>
          <SignUpButton isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect}/>
        </div>
      ) : (
        null
      )}
    </div>
  )
}
