import './App.css';
import React, { useEffect } from 'react';
import { collection, getDocs} from 'firebase/firestore'
import db from './firebase/firebaseConfig';


const App = () => {
  //HOOK
  useEffect(() => {
    const obtenerDatos = async()=> {
      const datos = await getDocs(collection(db,'usuarios'));
      return datos.docs[0].data().nombre;
    }
    console.log(obtenerDatos());
  },[]);
  return(
    <h1>Firebase Application!</h1>
  )
}

export default App;
