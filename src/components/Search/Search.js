import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../../context/movies-context'
import './Search.css'
import { useHistory } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai'

export const Search = () => {
  const {
    movies,
    setMovies,
    title,
    setTitle,
    favorites,
    setFavorites,
  } = useContext(MoviesContext)
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [nextPageDisabled, setNextPageDisabled] = useState(false)

  let history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    // const firstPage = 1
    setPage(1)
    retrieveMovies()
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
          // console.log('Page ' + page + movies)
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
    // console.log('effect')
    const checkNextPage = page + 1
    axios
      .get(
        `https://www.omdbapi.com/?s=${title}&type=${type}&page=${checkNextPage}&apikey=6fe3dbba`,
      )
      .then((res) => {
        const movies = res.data.Search
        // console.log('Checking page', page)
        if (movies !== undefined) {
          setNextPageDisabled(false)
        }
      })
      .catch(() => setNextPageDisabled(true))
  }, [page])

  useEffect(() => {
    console.log('favorites', favorites)
  }, [favorites])

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

      <div className="movies-container container row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 row-cols-xl-5 g-4">
        {movies &&
          movies.map((movie, index) => (
            <div key={index} className="col movie-card">
              <div className="card">
                <AiOutlinePlusCircle className="search-add-to-list card-icons" />
                <div>
                  <AiOutlineStar
                    className="search-star card-icons"
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
                    className="star card-icons gold-fill"
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

                <img
                  alt={movie.Title}
                  className="card-img-top"
                  src={movie.Poster}
                  onClick={() => {
                    history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                  }}
                />
                <div
                  className="card-body"
                  onClick={() => {
                    history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                  }}
                >
                  <p className="card-title lead">{movie.Title}</p>
                  <small className="card-text text-muted">{movie.Year}</small>
                </div>
              </div>
            </div>
          ))}
        {movies && movies.length > 0 ? (
          <Pagination className="pagination">
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
