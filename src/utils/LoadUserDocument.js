import db from '../firebase'
import { onSnapshot, collection } from 'firebase/firestore'

export default function loadUserDocument(
  currentUser,
  setFavorites,
  setMovieLists,
) {
  onSnapshot(collection(db, 'UserMovieLists'), (snapshot) => {
    console.log('Load user document')
    // console.log(currentUser.uid)
    // console.log(
    //   snapshot.docs
    //     .map((doc) => ({ ...doc.data(), id: doc.id }))
    //     .some((doc) => doc == currentUser.uid),
    // )
    setFavorites(
      ...snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((doc) => doc.id == currentUser.uid)
        .map((doc) => doc.favorites),
    )
    setMovieLists(
      ...snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((doc) => doc.id == currentUser.uid)
        .map((doc) => doc.movieLists),
    )
  })
}
