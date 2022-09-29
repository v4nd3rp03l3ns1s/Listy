import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {

    const { logout, isAuthenticated } = useAuth0();
    return (

        <div>
          {isAuthenticated ? (
            <button className='logout-button' onClick={() => logout()}>
                Logout
            </button>
          ) : (
            null
          )}
        </div>
    )
}

export default LogoutButton