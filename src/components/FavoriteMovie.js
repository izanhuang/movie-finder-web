import React, { useContext, useEffect } from 'react'
import { MoviesContext } from '../contexts/movies-context'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import updateUserDocument from '../utils/updateUserDocument'
import loadUserDocument from '../utils/loadUserDocument'

export default function FavoriteMovie({ componentName, movie, currentUser }) {
  const { favorites, setFavorites, movieLists, setMovieLists } = useContext(
    MoviesContext,
  )

  return (
    <div>
      <AiOutlineStar
        className={
          componentName == 'info'
            ? 'info-star info-card-icons'
            : 'search-star card-icons'
        }
        style={{
          display: favorites.some(
            (fav) =>
              fav.Poster === movie.Poster &&
              fav.Title === movie.Title &&
              fav.Year === movie.Year,
          )
            ? 'none'
            : 'block',
        }}
        onClick={() => {
          if (
            !favorites.some(
              (fav) =>
                fav.Poster === movie.Poster &&
                fav.Title === movie.Title &&
                fav.Year === movie.Year,
            )
          ) {
            const newFavorites = [...favorites, movie]
            setFavorites(newFavorites)
            if (currentUser != null) {
              updateUserDocument(currentUser, newFavorites, movieLists)
            }
          }
        }}
      />

      <AiFillStar
        className={
          componentName == 'info'
            ? 'info-star info-card-icons gold-fill'
            : 'star card-icons gold-fill'
        }
        style={{
          display: favorites.some(
            (fav) =>
              fav.Poster === movie.Poster &&
              fav.Title === movie.Title &&
              fav.Year === movie.Year,
          )
            ? 'block'
            : 'none',
        }}
        onClick={() => {
          const deletedFromFavorites = favorites.filter(
            (fav) => fav.imdbID !== movie.imdbID,
          )
          setFavorites(deletedFromFavorites)
          if (currentUser != null) {
            updateUserDocument(currentUser, deletedFromFavorites, movieLists)
          }
        }}
      />
    </div>
  )
}
