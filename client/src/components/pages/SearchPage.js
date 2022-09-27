import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import blackListyLogo from '../pictures/listyLogoBlack.svg'




export const SearchPage = () => {

    const { isLoading, isAuthenticated } = useAuth0();

    if (isLoading) {
      return <div>Loading...</div>
    }
  return (

    isAuthenticated && (

        
  
          <main className='login-page'>

              <section className='search-container'>
              <h1 className='hello'>Hello!</h1>
              <input className='search-bar' type='text' placeholder='Search' />
              </section>
              
          
  
          </main>
  
        
      )
  )
}
