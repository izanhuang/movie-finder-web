import React, { useContext } from 'react'
import { MoviesContext } from '../context/movies-context'
import { Search } from './Search'

export const Movies = () => {
  const { movies } = useContext(MoviesContext)
  return (
    <div>
      <Search />
      {movies && movies.map((movie, index) => <p key={index}>{movie.Title}</p>)}
    </div>
  )
}
