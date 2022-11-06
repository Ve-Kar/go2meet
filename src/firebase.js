import { initializeApp } from 'firebase/app';
import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { 
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from 'firebase/firestore';

 
 const firebaseConfig = {
  apiKey: "AIzaSyBwd_6z2tMIzlmD02xbEd7hsBtGBLXa8YE",
  authDomain: "react-go2meet-app.firebaseapp.com",
  databaseURL: "https://react-go2meet-app-default-rtdb.firebaseio.com",
  projectId: "react-go2meet-app",
  storageBucket: "react-go2meet-app.appspot.com",
  messagingSenderId: "43865734852",
  appId: "1:43865734852:web:f987f8ba77feee29031391"
};


// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {                                                                             //  we are using a try…catch block along with async functions 
    const res = await signInWithPopup(auth, googleProvider);                        //  so that we can handle errors easily
    const user = res.user;                                                          //  and avoid callbacks as much as possible.
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {                                       //this user is registered in our database with the user uid
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",                                                     //which also means that the user is new to our app
        email: user.email                                                           //     we make a new record in our database with additional data for future reference.
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// making a function for signing in using an email and password:

const logInWithEmailAndPassword = async (email, password) => {
 try {
   await signInWithEmailAndPassword(auth, email, password);
   } catch (err) {
    console.error(err);
    alert(err.message);
   }
};

// Since we know that the user is already registered with us, we don’t need to check the database.
// We can proceed with the authentication right away. 
// We just pass in the email and password to signInWithEmailAndPassword functions, 
//which is provided to us by Firebase.

// creating a function for registering a user with an email and password

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user; 
  await addDoc(collection(db, "users"), {                                       // Since we know that the user is new to our app, we create a record for the user 
    uid: user.uid,                                                              // without checking if there is one existing in our database.          
    name,                                                                       //It’s similar to the approach we used in Google Authentication but without checks.
    authProvider: "local",
      email,
    });
  } catch (err) { 
    console.error(err);
    alert(err.message)
   }
  };

  // function that will send a password reset link to an email address:

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);      // passing in the email in the sendPasswordResetEmail function provided by Firebase.
    alert("Password reset link sent!");             // The password reset email will be sent by Firebase.
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


//  simple logout function:

const logout = () => {
  signOut(auth);
};

// exporting all the functions,
export {
  auth, db, 
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
}



