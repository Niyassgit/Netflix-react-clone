import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth,
    signInWithEmailAndPassword, 
    signOut
       } from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore 
        } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDqLrNGJkMXJfPmZU6_5sJLMVAAMhy17Fk",
  authDomain: "netflix-clone-d1b41.firebaseapp.com",
  projectId: "netflix-clone-d1b41",
  storageBucket: "netflix-clone-d1b41.firebasestorage.app",
  messagingSenderId: "1015864510057",
  appId: "1:1015864510057:web:0626ab87728e9658df44f8"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db=getFirestore(app);

const signup =async (name,email,password)=>{
 
    try {

      const res=  await createUserWithEmailAndPassword(auth,email,password);

      const user=res.user;
      await addDoc(collection(db,"user"),{
         uid:user.uid,
         name,
         authProvider:"local",
         email,
      });
        
    } catch (error) {
        console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login =async (email,password)=>{
   
    try {
        
      await signInWithEmailAndPassword(auth,email,password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout=()=>{
    signOut(auth);
}

export{
    auth,
    db,
    login,
    signup,
    logout
}