import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase'
 var config = {
    apiKey: "Key",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    storageBucket: "",
    messagingSenderId: "messagingSenderId"
  };
  firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
