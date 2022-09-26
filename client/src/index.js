import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Auth0Provider
      domain='listy.us.auth0.com'
      clientId='6aFL4m1lJjcg6n26300PoGgjf8fExYZ1'
      redirectUri={window.location.origin}
      // audience='Listy unique correct identifier'
      // scope='openid profile email'
      // audience="https://listy.us.auth0.com/api/v2/"
      // scope="read:current_user update:current_user_metadata"
    >

      <App />
    </Auth0Provider>
  // </React.StrictMode>
);

