import { FunctionComponent } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'

interface IProps {
  isAuthenticated: boolean,
 }

export const Navbar: FunctionComponent<IProps> = ({isAuthenticated}) => {
  // const { isAuthenticated } = useAuth0();
  return (
    <div>
      { isAuthenticated ? (
        <nav className='nav'>
          <CustomLink to='/mainfeed' isAuthenticated ={isAuthenticated}><img className='feed-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png' /></CustomLink>
          <CustomLink to='/profile' isAuthenticated ={isAuthenticated}><img className='profile-logo' src='http://cdn.onlinewebfonts.com/svg/img_24787.png' /></CustomLink>
          <CustomLink to='/search' isAuthenticated ={isAuthenticated}><img className='search-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png' /></CustomLink>
          {/* <CustomLink to='/add'><img className='add-logo' src='https://icons.veryicon.com/png/o/object/material-design-icons/add-49.png'/></CustomLink> */}
        </nav>
      ) : (
        null
      )}
    </div>
  )
}

interface IProps {
  to: string,
  children: JSX.Element,
}

//MV todo: move into separate component file
function CustomLink({ to, children, ...props }: IProps) {
  const resolvedPath = useResolvedPath(to);
  // end: true says that the entire path must matchd
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <div className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}