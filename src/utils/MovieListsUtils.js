import React from 'react'
import { toast } from 'react-toastify'
import updateUserDocument from './updateUserDocument.js'

const notifyCreatedMovieList = (movieTitle, movieListName) =>
  toast.success('Created ' + movieListName + ' and added ' + movieTitle)
const notifyAddedMovie = (movieTitle, movieListName) =>
  toast.success('Added ' + movieTitle)
const notifyMovieAlreadyExists = (movieTitle, movieListName) =>
  toast.warn('Already exists in ' + movieListName)
const notifyRemovedMovie = (movieTitle, movieListName) =>
  toast.success('Removed ' + movieTitle)

export function createNewMovieListWithNameAndMovie(
  name,
  movie,
  movieLists,
  setMovieLists,
  setName,
) {
  movieLists[movieLists.length] = { name: name, list: [movie] }
  setMovieLists([...movieLists])
  notifyCreatedMovieList(movie.Title, name)
  setName('')
}

export function addToMovieList(
  movielist,
  movieParam,
  movieLists,
  setMovieLists,
  currentUser,
  favorites,
) {
  const index = movieLists.findIndex((list) => list == movielist)
  if (
    !movieLists[index].list.some((movie) => movie.imdbID == movieParam.imdbID)
  ) {
    movieLists[index].list = [...movieLists[index].list, movieParam]
    setMovieLists([...movieLists])
    updateUserDocument(currentUser, favorites, movieLists)
    notifyAddedMovie(movieParam.Title, movielist.name)
  } else {
    notifyMovieAlreadyExists(movieParam.Title, movielist.name)
  }
}

export function removeFromMovieList(
  movielist,
  movieParam,
  movieLists,
  setMovieLists,
) {
  const index = movieLists.findIndex((list) => list == movielist)
  const newMovieList = movieLists[index].list.filter(
    (movie) => movie.imdbID !== movieParam.imdbID,
  )
  movieLists[index].list = newMovieList
  notifyRemovedMovie(movieParam.Title, movielist.name)
  setMovieLists([...movieLists])
}
