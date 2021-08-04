import React from 'react';
import './App.css';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyC3qj_AyDdxwMzCmKk9NiujPP3tV7e6QM4",
  authDomain: "fir-chat-app-acef6.firebaseapp.com",
  projectId: "fir-chat-app-acef6",
  storageBucket: "fir-chat-app-acef6.appspot.com",
  messagingSenderId: "96799744896",
  appId: "1:96799744896:web:6097152dee09ce6ad5d765",
  measurementId: "G-8R9SLZJBS6"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
