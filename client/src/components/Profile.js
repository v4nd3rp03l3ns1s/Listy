import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './buttons/LogoutButton';
import { Add } from './Add';
import { LogoNavbar } from './LogoNavbar';

const Profile = () => {

    const { user, isAuthenticated } = useAuth0();
    return (
        
        isAuthenticated && (
            
            <main className='profile-page-div'>
                {/* <nav className='nav-top'><LogoNavbar /></nav> */}

            

           <article>
               <section className='profile-nav-bar'>
                   {user?.picture && <img className='profile-pic' src={user.picture} />}
                    <h2>{user?.name}</h2>
                    <button className='friends-button'><img className='friends-icon' src ='https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/537/original/friends.png'/></button>
                   </section>



               {/* <ul>
                   {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
               </ul> */}
           <LogoutButton />
           <div className='posts-container'><Add /></div>
           </article>
        </main>
        )
    )
}

// import React from 'react';

// import { useAuth0 } from '@auth0/auth0-react';

// const Profile = () => {
//   const { user } = useAuth0();
//   const { name, picture, email } = user;

//   return (
//     <div>
//       <div className="row align-items-center profile-header">
//         <div className="col-md-2 mb-3">
//           <img
//             src={picture}
//             alt="Profile"
//             className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
//           />
//         </div>
//         <div className="col-md text-center text-md-left">
//           <h2>{name}</h2>
//           <p className="lead text-muted">{email}</p>
//         </div>
//       </div>
//       <div className="row">
//         <pre className="col-12 text-light bg-dark p-4">
//           {JSON.stringify(user, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };







export default Profile;