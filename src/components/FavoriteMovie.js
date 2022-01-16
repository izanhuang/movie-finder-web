import React, { useContext } from 'react'
import { MoviesContext } from '../contexts/movies-context'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function FavoriteMovie({ componentName, movie }) {
  const { favorites, setFavorites } = useContext(MoviesContext)
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
            const addedToFavorites = [...favorites, movie]
            setFavorites(addedToFavorites)
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
        }}
      />
    </div>
  )
}
