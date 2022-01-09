import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../../context/movies-context'
import './Search.css'
import { useHistory } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const Search = () => {
  const {
    movies,
    setMovies,
    title,
    setTitle,
    favorites,
    setFavorites,
    movieLists,
    setMovieLists,
  } = useContext(MoviesContext)
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [nextPageDisabled, setNextPageDisabled] = useState(false)
  const [showAddMovieList, setShowAddMovieList] = useState(false)

  const handleAddMovieListClose = () => setShowAddMovieList(false)
  const handleAddMovieListShow = () => setShowAddMovieList(true)

  const [name, setName] = useState('')
  const [currentMovie, setCurrentMovie] = useState({})

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

  function createNewMovieListWithNameAndMovie(name, movie) {
    movieLists[movieLists.length] = { name: name, list: [movie] }
    setMovieLists([...movieLists])
    setName('')
  }

  function addToMovieList(movielist, movie) {
    const index = movieLists.findIndex((list) => list === movielist)
    console.log(movieLists[index], movieLists[index].list)
    movieLists[index].list = [...movieLists[index].list, movie]
    setMovieLists(movieLists)
  }

  useEffect(() => {
    console.log(movieLists)
  }, [movieLists])

  useEffect(() => {
    console.log(name)
  }, [name])

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

      <Modal show={showAddMovieList} onHide={handleAddMovieListClose}>
        <Modal.Header closeButton>
          <Modal.Title>Give your movie list a name.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              createNewMovieListWithNameAndMovie(name, currentMovie)
              handleAddMovieListClose()
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="movies-container container row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 row-cols-xl-5 g-4">
        {movies &&
          movies.map((movie, index) => (
            <div key={index} className="col movie-card">
              <div className="card">
                <OverlayTrigger
                  trigger="click"
                  key="bottom-start"
                  placement="bottom-start"
                  rootClose={true}
                  overlay={
                    <Popover id="popover-positioned-bottom-start">
                      <Popover.Header as="h3">Add to movie list</Popover.Header>
                      <Popover.Body className="popover-button">
                        <Button
                          variant="dark"
                          className="custom-button"
                          onClick={() => {
                            document.body.click()
                            setCurrentMovie(movie)
                            handleAddMovieListShow()
                          }}
                        >
                          New movie list
                        </Button>
                      </Popover.Body>
                      {movieLists.map((movielist) => (
                        <Popover.Body
                          onClick={() => {
                            setName(movielist.name)
                            addToMovieList(movielist, movie)
                          }}
                        >
                          {movielist.name}
                        </Popover.Body>
                      ))}
                    </Popover>
                  }
                >
                  <button className="search-add-to-list card-icons">
                    <AiOutlinePlusCircle />
                  </button>
                </OverlayTrigger>

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
