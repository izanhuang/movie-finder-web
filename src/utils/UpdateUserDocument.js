import db from '../firebase'
import { setDoc, doc } from 'firebase/firestore'

export default async function updateUserDocument(
  currentUser,
  favorites,
  movieLists,
) {
  // console.log('Inside update, no null: ', currentUser.uid)
  const docRef = doc(db, 'UserMovieLists', currentUser.uid)
  // console.log('Changed favorites ', favorites)
  // console.log('Changed movieLists ', movieLists)
  const payload = { favorites, movieLists }
  await setDoc(docRef, payload)
  console.log('Updated doc')
}
