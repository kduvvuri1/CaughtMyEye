// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebase'; // Adjust the import path as necessary

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Only true initially

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
      setLoading(false); // Set to false once auth state is known
    });
    return unsubscribe;
  }, []); // Empty dependency array ensures this runs only once on mount

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Return the user object
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Make sure to re-throw the error
    }
  };
  
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Return the user object
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Make sure to re-throw the error
    }
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = { user, signup, login, googleLogin, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children} {/* Render children immediately; ProtectedRoute handles loading */}
    </AuthContext.Provider>
  );
}