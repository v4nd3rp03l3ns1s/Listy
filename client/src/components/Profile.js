import { useAuth0 } from '@auth0/auth0-react'
// import LogoutButton from './buttons/LogoutButton';
import { Add } from './Add';
// import { LogoNavbar } from './LogoNavbar';

const Profile = () => {

    const { user, isAuthenticated } = useAuth0();
    console.log(user)
    return (

        isAuthenticated && (

            <main className='profile-page-div'>
                {/* <nav className='nav-top'><LogoNavbar /></nav> */}



                <article>
                    <section className='profile-nav-bar'>
                        {user?.picture && <img className='profile-pic' src={user.picture} />}
                        <h2 className='profile-name'>{user?.nickname}</h2>
                        <button className='friends-button'><img className='friends-icon' src='https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/537/original/friends.png' /></button>
                    </section>



                    {/* <ul>
                   {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
               </ul> */}
                    {/* <LogoutButton /> */}
                    <div className='posts-container'><Add /></div>
                </article>
            </main>
        )
    )
}










export default Profile;