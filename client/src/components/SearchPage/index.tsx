import { FunctionComponent } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

interface IProps {
  isLoading: boolean,
  isAuthenticated: boolean,
 }

export const SearchPage: FunctionComponent<IProps> = ({isLoading, isAuthenticated}) => {

    // const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      { isAuthenticated ? (
        <main className='login-page'>
          <section className='search-container'>
            <h1 className='hello'>Hello!</h1>
            <input className='search-bar' type='text' placeholder='Search' />
          </section>
        </main>
      ) : (
        null
      )}
    </div>
  )
}
