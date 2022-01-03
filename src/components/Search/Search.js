import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../../context/movies-context'
import './Search.css'
import { useHistory } from 'react-router-dom'

export const Search = () => {
  const { movies, setMovies, title, setTitle } = useContext(MoviesContext)
  const [type, setType] = useState('movie')

  let history = useHistory()

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
      //   history.push('/search')
      // })
      .catch((error) => console.log(error))
  }

  return (
    <div className="container">
      <form id="search-form" onSubmit={handleSubmit}>
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
      <div className="container row row-cols-2 row-cols-md-2 row-cols-lg-5 row-cols-xl-5 g-4">
        {movies &&
          movies.map((movie, index) => (
            <div
              key={index}
              className="col movie-card"
              onClick={() => {
                history.push(`/fullPlot/${type}/${movie.Title}`)
              }}
            >
              <div className="card">
                <img
                  alt={movie.Title}
                  className="card-img-top"
                  src={movie.Poster}
                />
                <div className="card-body">
                  <p className="card-title lead">{movie.Title}</p>
                  <small className="card-text text-muted">{movie.Year}</small>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
