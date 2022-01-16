import React from 'react'
import db from '../firebase'
import { setDoc, doc } from 'firebase/firestore'

export default async function updateUserDocument(
  currentUser,
  favorites,
  movieLists,
) {
  if (currentUser) {
    const docRef = doc(db, 'UserMovieLists', currentUser.uid)
    console.log('Changed movieLists ', movieLists)
    const payload = { favorites, movieLists }
    await setDoc(docRef, payload)
  }
}