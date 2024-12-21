import { createContext,useContext, useEffect ,useState} from "react";
import { initializeApp } from "firebase/app";
import {  onAuthStateChanged,
  signInWithPopup,getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  ,GoogleAuthProvider,
signOut  } from "firebase/auth";

  import { getFirestore } from "firebase/firestore";
const FireBaseContext=createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyB6SyxjeEDiCOacWp-xO-8wgE0fgRRdZus",
    authDomain: "bookify-2537b.firebaseapp.com",
    projectId: "bookify-2537b",
    storageBucket: "bookify-2537b.firebasestorage.app",
    messagingSenderId: "794391136639",
    appId: "1:794391136639:web:4985d2556e13db6690724a"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

export const useFirebase=()=>useContext(FireBaseContext) 
export const FireBaseProvider=(props)=>{
    const [user,setUser]=useState(null);
    const signupwithEmailandPassword=(email,password)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          const user = userCredential.user;
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
        });
      }
      const loginwithEmailAndPassword=(email,password)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      }
      const provider = new GoogleAuthProvider();
      const loginwithGoogle=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });  
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              const uid = user.uid;
            
            } else {
              // User is signed out
              // ...
              setUser(null);
            }
          });
    },[]);

    const IsloggedIn=user?true:false
    const LogOut=()=>{
      signOut(auth).then(() => {
        console.log("User signed out.");
      }).catch((error) => {
        console.error("Error signing out: ", error);
      });
    }
    const handleCreateNewListing=(name,isbn,price,cover)=>{
       
    }
    return <FireBaseContext.Provider value={{
        loginwithGoogle,
        signupwithEmailandPassword,
        loginwithEmailAndPassword,
        IsloggedIn,
        LogOut
        }}>
        {props.children}
        </FireBaseContext.Provider>
}