import { FunctionComponent } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

interface IProps {
  isAuthenticated: boolean,
  loginWithRedirect: Function,
}

const SignUpButton: FunctionComponent<IProps> = ({isAuthenticated, loginWithRedirect}) => {

  // const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (

      <div className='container'>
        { !isAuthenticated ? (
          <button className='signup-button' onClick={() => loginWithRedirect({
            screen_hint: 'signup',
          })}>
            Sign Up
          </button>
        ) : (
          null
        )}
      </div>

      //MV todo: clean up this commented code when we confirm ternary refactor works
      // !isAuthenticated && (
      //   <button className='signup-button' onClick={() => loginWithRedirect({
      //     screen_hint: 'signup',
      //   })}>
      //       Sign Up
      //   </button>
      //   )
    )
}

export default SignUpButton;