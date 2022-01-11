import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import './FullPlot.css'
import Card from 'react-bootstrap/Card'
import { AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai'
import { MoviesContext } from '../../context/movies-context'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const FullPlot = () => {
  const { fullPlotType, fullPlotTitle } = useParams()
  const [fullPlot, setFullPlot] = useState('')
  const { favorites, setFavorites, movieLists, setMovieLists } = useContext(
    MoviesContext,
  )
  const [showAddMovieList, setShowAddMovieList] = useState(false)

  const handleAddMovieListClose = () => setShowAddMovieList(false)
  const handleAddMovieListShow = () => setShowAddMovieList(true)

  const [name, setName] = useState('')
  const [currentMovie, setCurrentMovie] = useState({})

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?t=${fullPlotTitle}&type=${fullPlotType}&plot=full&apikey=6fe3dbba`,
      )
      .then((res) => {
        const fullPlot = res.data
        setFullPlot(fullPlot)
      })

      .catch((error) => console.log(error))
  }, [])

  function createNewMovieListWithNameAndMovie(name, movie) {
    movieLists[movieLists.length] = { name: name, list: [movie] }
    setMovieLists([...movieLists])
    setName('')
  }

  function addToMovieList(movielist, fullPlot) {
    const index = movieLists.findIndex((list) => list == movielist)
    if (
      !movieLists[index].list.some((movie) => movie.imdbID == fullPlot.imdbID)
    ) {
      movieLists[index].list = [...movieLists[index].list, fullPlot]
      setMovieLists([...movieLists])
    }
  }

  useEffect(() => {
    console.log(movieLists)
  }, [movieLists])

  return (
    <div className="container movie-info">
      <Modal show={showAddMovieList} onHide={handleAddMovieListClose}>
        <Modal.Header closeButton>
          <Modal.Title>Give your movie list a name.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </Modal.Body>
        <Modal.Body
          className="no-padding-top"
          style={{
            display: movieLists.some((movielist) => movielist.name == name)
              ? 'block'
              : 'none',
          }}
        >
          This movie list already exists.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              createNewMovieListWithNameAndMovie(name, currentMovie)
              handleAddMovieListClose()
            }}
            disabled={movieLists.some((movielist) => movielist.name == name)}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="info-header">
        <h1>{fullPlotTitle}</h1>
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
                    setCurrentMovie(fullPlot)
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
                    addToMovieList(movielist, fullPlot)
                  }}
                >
                  {movielist.name}
                </Popover.Body>
              ))}
            </Popover>
          }
        >
          <button className="info-add-to-list info-card-icons">
            <AiOutlinePlusCircle />
          </button>
        </OverlayTrigger>

        <div>
          <AiOutlineStar
            className="info-star info-card-icons"
            style={{
              display: favorites.some(
                (fav) =>
                  fav.Poster === fullPlot.Poster &&
                  fav.Title === fullPlot.Title &&
                  fav.Year === fullPlot.Year,
              )
                ? 'none'
                : 'block',
            }}
            onClick={() => {
              if (
                !favorites.some(
                  (fav) =>
                    fav.Poster === fullPlot.Poster &&
                    fav.Title === fullPlot.Title &&
                    fav.Year === fullPlot.Year,
                )
              ) {
                const addedToFavorites = [...favorites, fullPlot]
                setFavorites(addedToFavorites)
              }
            }}
          />

          <AiFillStar
            className="info-star info-card-icons gold-fill"
            style={{
              display: favorites.some(
                (fav) =>
                  fav.Poster === fullPlot.Poster &&
                  fav.Title === fullPlot.Title &&
                  fav.Year === fullPlot.Year,
              )
                ? 'block'
                : 'none',
            }}
            onClick={() => {
              const deletedFromFavorites = favorites.filter(
                (fav) => fav.imdbID !== fullPlot.imdbID,
              )
              setFavorites(deletedFromFavorites)
            }}
          />
        </div>
      </div>
      <div>
        <div className="fixed-row text-muted">
          <div>{fullPlot.Year}</div>
          <span className="dot"></span>
          <div>{fullPlot.Rated}</div>
          <span className="dot"></span>
          <div>{fullPlot.Runtime}</div>
        </div>

        <div className="flex-start">
          <div className="flex-start-left">
            <img className="movie-poster" src={fullPlot.Poster} />
          </div>

          <div className="flex-start-right">
            <div className="fixed-row imdb">
              <div>
                <p>IMDb ID: {fullPlot.imdbID}</p>
              </div>
              <span></span>
              <div>
                <p>IMDb Rating: {fullPlot.imdbRating}</p>
              </div>
              <span></span>
              <div>
                <p>IMDb Votes: {fullPlot.imdbVotes}</p>
              </div>
            </div>

            <div>Actors: </div>
            <p className="movie-div">{fullPlot.Actors}</p>

            <div>Plot: </div>
            <p className="movie-div">{fullPlot.Plot}</p>

            <div>Genre: </div>
            <p className="movie-div" className="movie-div">
              {fullPlot.Genre}
            </p>

            <div>Language: </div>
            <p className="movie-div">{fullPlot.Language}</p>

            <div>Country: </div>
            <p className="movie-div">{fullPlot.Country}</p>
          </div>
        </div>

        <div className="additional-details">
          <Card>
            <Card.Header>Ratings</Card.Header>
            <Card.Body>
              {fullPlot.Ratings &&
                fullPlot.Ratings.map((rating) => (
                  <Card.Text>
                    {rating.Source} - {rating.Value}
                  </Card.Text>
                ))}
              {/* <Card.Text>
                <div>Metascore - {fullPlot.Metascore}</div>
              </Card.Text> */}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Production</Card.Header>
            <Card.Body>
              <Card.Text>Released: {fullPlot.Released}</Card.Text>
              {fullPlot.DVD ? <Card.Text>DVD: {fullPlot.DVD}</Card.Text> : ''}
              {fullPlot.Director ? (
                <Card.Text>Director: {fullPlot.Director}</Card.Text>
              ) : (
                ''
              )}
              <Card.Text>Writer: {fullPlot.Writer}</Card.Text>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Additional Details</Card.Header>
            <Card.Body>
              {fullPlot.BoxOffice ? (
                <Card.Text>
                  Box Office (Gross US &#38; Canada): {fullPlot.BoxOffice}
                </Card.Text>
              ) : (
                ''
              )}
              <Card.Text>Awards: {fullPlot.Awards}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* 
        <div>Production: </div>
        <p>{fullPlot.Production}</p> */}
      </div>
    </div>
  )
}
