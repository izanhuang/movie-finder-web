import React, { useContext } from 'react'
import { MoviesContext } from '../context/movies-context'
import { Search } from './Search'

export const MoviesByTitle = () => {
  const { movies } = useContext(MoviesContext)
  return (
    <div className="container">
      <Search />
      {movies && movies.map((movie, index) => <p key={index}>{movie.Title}</p>)}
    </div>
  )
}
