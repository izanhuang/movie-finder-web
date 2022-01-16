import React from 'react'
import db from '../firebase'
import { onSnapshot, collection } from 'firebase/firestore'

export default function LoadMovieListDemo(setFavorites, setMovieLists) {
  return onSnapshot(collection(db, 'UserMovieLists'), (snapshot) => {
    setFavorites(
      ...snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((doc) => doc.id == 'Demo')
        .map((doc) => doc.favorites),
    )
    setMovieLists(
      ...snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((doc) => doc.id == 'Demo')
        .map((doc) => doc.movieLists),
    )
  })
}
