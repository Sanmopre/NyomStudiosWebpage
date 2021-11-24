
import './App.css';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCpzOFtkgy5fFdsgBtYfF8-zSbsqVEjh_k",
  authDomain: "react-firebase-applicati-44951.firebaseapp.com",
  projectId: "react-firebase-applicati-44951",
  storageBucket: "react-firebase-applicati-44951.appspot.com",
  messagingSenderId: "897941785637",
  appId: "1:897941785637:web:ac81d2d8aa3ed63ca383cc",
  measurementId: "G-46RF3CEVS0"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
      </header> 
      <section>
        {user ? <ChatRoom /> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn()
{
const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut()
{
return auth.currentUser && (
  <button onClick={() => auth.signOut()}>Sign Out</button>
)
}

function ChatRoom()
{
const messageRef = firestore.collection('messages');
const query = messageRef.orderBy('createdAt').limit(30);

const [messages] = useCollectionData(query, {idField: 'id'});

return(
  <>
  <div>
    {messages && messages.map(msg=> <ChatMessage key={msg.id} message = {msg}/>)}
  </div>
  </>
)
}

function ChatMessage(props)
{
  const {text, uid} = props.message;

  return <p>{text}</p>
}

export default App;
