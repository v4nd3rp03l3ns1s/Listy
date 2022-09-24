// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';


// const Auth0ProviderWithHistory = ({ children }) => {
//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// //   allows us to redirect the user to a different url
//   const history = useHistory();

// //   we can access that history object and push on things 
//   const onRedirectCallback = (appState) => {
//     history.push(appState?.returnTo || window.location.pathname);
//   };

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       redirectUri={window.location.origin}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export default Auth0ProviderWithHistory;