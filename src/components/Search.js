import React, { useContext } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../context/movies-context'

export const Search = ({ history }) => {
  const { setMovies, title, setTitle } = useContext(MoviesContext)

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get(
        `https://www.omdbapi.com/?s=${title}&type=movie&page=1&apikey=6fe3dbba`,
      )
      .then((res) => {
        const movies = res.data.Search
        setMovies(movies)
      })
      .then(() => {
        history.push('/movies')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
    </div>
  )
}
