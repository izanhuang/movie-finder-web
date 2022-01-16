import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { MoviesContext } from '../../contexts/movies-context'
import './Search.css'
import { useHistory } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../contexts/AuthContext'
import loadUserDocument from '../../utils/loadUserDocument'
import {
  createNewMovieListWithNameAndMovie,
  addToMovieList,
} from '../../utils/MovieListsUtils'
import CustomToastContainer from '../CustomToastContainer'
import AddMovieToMovieListModal from '../Modals/AddMovieToMovieListModal'

export const Search = () => {
  const { currentUser } = useAuth()
  const {
    movies,
    setMovies,
    title,
    setTitle,
    favorites,
    setFavorites,
    movieLists,
    setMovieLists,
    findByTitle,
    setFindByTitle,
    setTotalResults,
    page,
    setPage,
    name,
    setName,
    setCurrentMovie,
  } = useContext(MoviesContext)
  const [type, setType] = useState('')
  const [nextPageDisabled, setNextPageDisabled] = useState(false)

  const [showAddMovieList, setShowAddMovieList] = useState(false)

  const handleAddMovieListClose = () => {
    setShowAddMovieList(false)
    setName('')
  }
  const handleAddMovieListShow = () => {
    setShowAddMovieList(true)
    setName('')
  }

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
          `https://www.omdbapi.com/?s=${title}&type=movie&page=${page}&apikey=6fe3dbba`,
        )
        .then((res) => {
          const results = res.data.Search
          const numOfResults = res.data.totalResults
          setMovies(results)
          setTotalResults(numOfResults)
          if (findByTitle !== title) {
            setFindByTitle(title)
          }
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
    console.log('Current page: ', page)
    retrieveMovies()
    // console.log('effect')
    const checkNextPage = page + 1
    axios
      .get(
        `https://www.omdbapi.com/?s=${title}&type=movie&page=${checkNextPage}&apikey=6fe3dbba`,
      )
      .then((res) => {
        const results = res.data.Search
        // console.log('Checking page', page)
        if (results !== undefined) {
          setNextPageDisabled(false)
        }
      })
      .catch(() => setNextPageDisabled(true))
  }, [page])

  useEffect(() => {
    // console.log('favorites', favorites)
  }, [favorites])

  useEffect(() => {
    console.log('Movies: ', movies)
  }, [movies])

  // function createNewMovieListWithNameAndMovie(name, movie) {
  //   movieLists[movieLists.length] = { name: name, list: [movie] }
  //   setMovieLists([...movieLists])
  //   notifyCreatedMovieList(movie.Title, name)
  //   setName('')
  // }

  // function addToMovieList(movielist, movieParam) {
  //   const index = movieLists.findIndex((list) => list == movielist)
  //   if (
  //     !movieLists[index].list.some((movie) => movie.imdbID == movieParam.imdbID)
  //   ) {
  //     movieLists[index].list = [...movieLists[index].list, movieParam]
  //     setMovieLists([...movieLists])
  //     updateUserDocument(currentUser, favorites, movieLists)
  //     notifyAddedMovie(movieParam.Title, movielist.name)
  //   } else {
  //     notifyMovieAlreadyExists(movieParam.Title, movielist.name)
  //   }
  // }

  useEffect(() => {
    // console.log(movieLists)
  }, [movieLists])

  useEffect(() => {
    // console.log(name)
  }, [name])

  useEffect(() => {
    if (currentUser && currentUser !== undefined) {
      loadUserDocument(currentUser, setFavorites, setMovieLists)
    }
  }, [])

  return (
    <div className="container">
      <h1 className="display-4 display-margin">Search</h1>
      <form id="search-form" onSubmit={handleSubmit}>
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

      <CustomToastContainer autoClose={2500} />

      <AddMovieToMovieListModal
        showAddMovieList={showAddMovieList}
        handleAddMovieListClose={handleAddMovieListClose}
      />

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
                            addToMovieList(
                              movielist,
                              movie,
                              movieLists,
                              setMovieLists,
                              currentUser,
                              favorites,
                            )
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
                  src={
                    movie.Poster == 'N/A'
                      ? 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
                      : movie.Poster
                  }
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
