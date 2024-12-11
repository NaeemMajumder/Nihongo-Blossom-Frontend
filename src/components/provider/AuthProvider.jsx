import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  let registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  let registerWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  let updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  let logOutUser = () => {
    return signOut(auth);
  };

  let signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  let authInfo = {
    user,
    setUser,
    registerWithEmail,
    registerWithGoogle,
    updateUserProfile,
    logOutUser,
    signInUser,
    loading,
  };

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
