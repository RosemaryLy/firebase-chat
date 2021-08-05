import React, {useRef, useState} from 'react';
import './App.css';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC3qj_AyDdxwMzCmKk9NiujPP3tV7e6QM4",
  authDomain: "fir-chat-app-acef6.firebaseapp.com",
  projectId: "fir-chat-app-acef6",
  storageBucket: "fir-chat-app-acef6.appspot.com",
  messagingSenderId: "96799744896",
  appId: "1:96799744896:web:d5470fa30752431ad5d765",
  measurementId: "G-WXCCPQ618E"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌸💬 Let's Chat! 💬🌸</h1>
      </header>
      <SignOut />
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in"onClick={signInWithGoogle}>Sign in with Google</button>
      <div className="center">
        Do not violate the community guidelines or you will be banned for life!</div>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue|| formValue.replace(/^\s+/, '').replace(/\s+$/, '') === ''}>✉️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL,createdAt } = props.message;
  const datestamp = new Date().toDateString();
  const timestamp = new Date(createdAt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  const datetime = datestamp+ " " + timestamp
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
  <div className="center">
    <p className="timestamp">{datetime}</p>
    </div>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Light'} alt="User" />
      <p>{text}
      </p>
    </div>
  </>)
}

export default App;
