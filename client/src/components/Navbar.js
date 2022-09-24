import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import feedLogo from './pictures/feedLogo.svg'
import { Add } from './Add'

export const Navbar = () => {

    const { isAuthenticated } = useAuth0();

    
    
    
    return (
        isAuthenticated && (

        <nav className='nav'>

            <CustomLink to='/mylist'><img className='feed-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png'/></CustomLink>
            <CustomLink to='/profile'><img className='profile-logo' src='http://cdn.onlinewebfonts.com/svg/img_24787.png'/></CustomLink>
            <CustomLink to='/'><img className='search-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png'/></CustomLink>

            {/* <CustomLink to='/add'><img className='add-logo' src='https://icons.veryicon.com/png/o/object/material-design-icons/add-49.png'/></CustomLink> */}
            {/* <Add /> */}

    
        </nav>
        )
  )
}



function CustomLink({ to, children, ...props}){
    //
    const resolvedPath = useResolvedPath(to);
    // end: true says that the entire path must match
    const isActive = useMatch( {path: resolvedPath.pathname, end: true } )

    return (
        <div className={ isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
                </Link>
        </div>
    )

}