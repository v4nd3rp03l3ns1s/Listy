import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (

        <div>
            { !isAuthenticated ? (
                <button className='login-button' onClick={() => loginWithRedirect()}>
                    Log In
                </button>
            ) : (
                null
            )}
        </div>

        //MV todo: clean up this commented code when we confirm ternary refactor works
        // !isAuthenticated && (

        //     <button className='login-button' onClick={() => loginWithRedirect()}>
        //         Log In
        //     </button>

        // )
    )
}

export default LoginButton