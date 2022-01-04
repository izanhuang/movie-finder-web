import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../../context/movies-context'
import './Search.css'
import { useHistory } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'

export const Search = () => {
  const { movies, setMovies, title, setTitle } = useContext(MoviesContext)
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [nextPageDisabled, setNextPageDisabled] = useState(false)

  let history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    const firstPage = 1
    setPage(firstPage)
  }

  const retrieveMovies = async () => {
    try {
      axios
        .get(
          `https://www.omdbapi.com/?s=${title}&type=${type}&page=${page}&apikey=6fe3dbba`,
        )
        .then((res) => {
          const movies = res.data.Search
          setMovies(movies)
          console.log('Page ' + page + movies)
        })
    } catch (error) {
      console.log(error)
    }
  }

  function handlePrevPage() {
    const prevPage = page - 1
    setPage(prevPage)
  }

  function handleNextPage() {
    const nextPage = page + 1
    setPage(nextPage)
  }

  useEffect(() => {
    retrieveMovies()
    console.log('effect')
    const checkNextPage = page + 1
    axios
      .get(
        `https://www.omdbapi.com/?s=${title}&type=${type}&page=${checkNextPage}&apikey=6fe3dbba`,
      )
      .then((res) => {
        const movies = res.data.Search
        console.log('Checking page', page)
        if (movies !== undefined) {
          setNextPageDisabled(false)
        }
      })
      .catch(() => setNextPageDisabled(true))
  }, [page])

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://www.omdbapi.com/?s=${title}&type=${type}&page=${
  //         page + 2
  //       }&apikey=6fe3dbba`,
  //     )
  //     .then((res) => {
  //       const movies = res.data.Search
  //       console.log('Checking page', page)
  //       if (movies === undefined) {
  //         setNextPageDisabled(true)
  //       } else {
  //         setNextPageDisabled(false)
  //       }
  //     })
  // }, [movies, page])

  return (
    <div className="container">
      <form id="search-form" onSubmit={handleSubmit}>
        <select
          name="filter"
          id="filter"
          onChange={(e) => {
            setType(e.target.value)
          }}
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
                history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
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
        {movies && movies.length > 0 ? (
          <Pagination>
            <Pagination.Item
              disabled={page === 1 ? true : false}
              onClick={handlePrevPage}
            >
              Prev
            </Pagination.Item>
            <Pagination.Item>{page}</Pagination.Item>

            <Pagination.Item
              disabled={nextPageDisabled}
              onClick={handleNextPage}
            >
              Next
            </Pagination.Item>
          </Pagination>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
