import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AdminPage from './components/admin/AdminPage';
import UserPage from './components/users/UserPage';
import * as serviceWorker from './serviceWorker';


document.addEventListener("DOMContentLoaded", function(event) { 

  const adminPage = document.getElementById('admin'); 
  const userPage = document.getElementById('user');

  if(adminPage){
    ReactDOM.render(
      <React.StrictMode>
        <AdminPage />
      </React.StrictMode>,
      adminPage
    );
  }else if(userPage){
    ReactDOM.render(
      <React.StrictMode>
        <UserPage/>
      </React.StrictMode>,
      userPage
    );
  }
  
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
