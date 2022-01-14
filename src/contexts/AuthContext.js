import React, { useContext, useState, useEffect } from 'react'
import app, { auth } from '../firebase'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    const auth = getAuth()
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    const auth = getAuth()
    return signOut(auth)
  }

  function resetPassword(email) {
    const auth = getAuth()
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    const auth = getAuth()
    return updateEmail(auth.currentUser, email)
    // .then(() => {
    //   // Email updated!
    //   // ...
    //   console.log('Updated email')
    // })
    // .catch((error) => {
    //   console.log(error)
    //   // An error occurred
    //   // ...
    // })
    // return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    const auth = getAuth()
    return updateEmail(auth.currentUser, password)
    // .then(() => {
    //   // Email updated!
    //   // ...
    //   console.log('Updated password')
    // })
    // .catch((error) => {
    //   console.log(error)
    //   // An error occurred
    //   // ...
    // })
    // return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
