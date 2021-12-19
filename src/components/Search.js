import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../context/movies-context'
import '../styles/Search.css'

export const Search = ({ history }) => {
  const { movies, setMovies, title, setTitle } = useContext(MoviesContext)
  const [type, setType] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get(
        `https://www.omdbapi.com/?s=${title}&type=${type}&page=1&apikey=6fe3dbba`,
      )
      .then((res) => {
        const movies = res.data.Search
        setMovies(movies)
      })
      // .then(() => {
      //   history.push('/movies')
      // })
      .catch((error) => console.log(error))
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <select
          name="filter"
          id="filter"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
        <input
          type="text"
          name="titleName"
          id="search-input"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button id="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="container row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {movies &&
          movies.map((movie, index) => (
            <div key={index} className="col movie-card">
              <div className="card">
                <img
                  alt={movie.Title}
                  className="card-img-top"
                  src={movie.Poster}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
