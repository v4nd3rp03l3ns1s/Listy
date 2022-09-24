import './App.css';
import ReactDOM from 'react-dom/client';
import LoginButton from './components/buttons/LoginButton';
import LogoutButton from './components/buttons/LogoutButton';
import Profile from './components/Profile';
import { LoginPage } from './components/pages/LoginPage';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Add } from './components/Add';
import { LogoNavbar } from './components/LogoNavbar';
import { Main } from './components/pages/Main';

function App() {

  /*

  THE WAY TO DO ROUTING WITHOUT REACT ROUTES
  let Component
  switch(window.location.pathname){
    case '/':
      Component = MainFeed
      break
    case '/pricing':
      Component = Pricing
      break
    case '/about':
      Component = About
      break
    case '/login':
      Component = LoginPage
      break
  }
  */

  //getAccessTokenSilently is a jwt and it will be verified on the backend

// const { isLoading, error, getAccessTokenSilently } = useAuth0();

// const callApi = () =>{
//   axios.get('http://localhost:3030/')
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error.message))

// }

// const callProtectedApi = async () =>{
//   try {
//     const token = await getAccessTokenSilently();
//     const response = await axios.get('http://localhost:3030/protected', {
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     })
//     console.log(response.data)
//   } catch (error) {
//     console.log(error.message)
//   }
// }



  return (
    <>
    <Main />
    </>
  );
}

export default App;
