import React, { useContext } from 'react'
import './Favorites.css'
import { MoviesContext } from '../../context/movies-context'

export const Favorites = () => {
  const { favorites, setFavorites } = useContext(MoviesContext)
  return (
    <div>
      {favorites &&
        favorites.map((favorite) => {
          ;<div>
            <p>{favorite.Poster}</p>
            <p>{favorite.Title}</p>
            <p>{favorite.Year}</p>
          </div>
        })}
    </div>
  )
}
