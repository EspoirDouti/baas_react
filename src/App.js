import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";
import ReactGA from "react-ga";
const TRACKING_ID = "UA-161453962-3";

ReactGA.initialize(TRACKING_ID);


function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  //Google Analytics PageView
  useEffect(()=>{
    ReactGA.pageview(window.location.pathname);
  },[])
//Google Analytics PageView


  const register = async () => {
    try {

      //Google Analytics Event
      ReactGA.event({
        categorie:"authentication",
        action:"register",
        label:"label",
        value:"valeur"
      });
      //Google Analytics Event 

      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      

      console.log(user);
      // ReactGA.event({ 
      //   catégorie : 'Utilisateur', 
      //   action : 'Créé un compte' 
      // });
    } catch (error) {
      console.log(error.message);
      // ReactGA.exception({ 
      //   description : "Une erreur s'est produite", 
      //   fatal : 'vrai' 
      // });
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </div>

  );
}

export default App;
