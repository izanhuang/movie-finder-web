import React, { useContext, useEffect, useState } from 'react'
import './Favorites.css'
import { MoviesContext } from '../../context/movies-context'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import { useHistory } from 'react-router-dom'
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineClear,
} from 'react-icons/ai'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const Favorites = () => {
  const { favorites, setFavorites, movieLists, setMovieLists } = useContext(
    MoviesContext,
  )
  const [activeAccordianItems, setActiveAccordianItems] = useState(['0'])

  const [showFavoritesClear, setShowFavoritesClear] = useState(false)
  const handleCloseFavoritesClear = () => setShowFavoritesClear(false)
  const handleShowFavoritesClear = () => setShowFavoritesClear(true)

  const [showMovieListsClear, setShowMovieListsClear] = useState(false)
  const handleCloseMovieListsClear = () => setShowMovieListsClear(false)
  const handleShowMovieListsClear = () => setShowMovieListsClear(true)

  const [showMovieListsDelete, setShowMovieListsDelete] = useState(false)
  const handleCloseMovieListsDelete = () => setShowMovieListsDelete(false)
  const handleShowMovieListsDelete = () => setShowMovieListsDelete(true)

  let history = useHistory()

  useEffect(() => {
    console.log(favorites)
  }, [favorites])

  useEffect(() => {}, [setMovieLists])

  useEffect(() => {
    console.log(activeAccordianItems)
  }, [activeAccordianItems])

  return (
    <div className="container favorites-container">
      <Alert variant="info" className="align-left">
        <Alert.Link href="/login">Create an account</Alert.Link> to save your
        favorites and movie list(s).
      </Alert>

      <Accordion defaultActiveKey={activeAccordianItems} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => {
              const updateActiveKeys = activeAccordianItems.some(
                (eventKey) => eventKey === '0',
              )
              var newActiveKeys = []
              {
                updateActiveKeys
                  ? (newActiveKeys = activeAccordianItems.filter(
                      (eventKey) => eventKey !== '0',
                    ))
                  : (newActiveKeys = [...activeAccordianItems, '0'])
              }
              setActiveAccordianItems(newActiveKeys)
            }}
          >
            Favorites
          </Accordion.Header>

          {favorites && favorites.length === 0 ? (
            <Accordion.Body>
              <Alert variant="light" className="align-left">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <hr />
                <p className="mb-0">
                  <Alert.Link href="/">Star movies</Alert.Link> to add them to
                  your favorites!
                </p>
              </Alert>
            </Accordion.Body>
          ) : (
            <Accordion.Body>
              <div className="favorites-mapping-container">
                {favorites.map((favorite) => (
                  <Card className="favorite-card col-6 col-xs-6 col-sm-5">
                    <Card.Img
                      src={favorite.Poster}
                      onClick={() => {
                        history.push(
                          `/fullPlot/${favorite.Type}/${favorite.Title}`,
                        )
                      }}
                    />
                    <AiOutlinePlusCircle className="add-to-list card-icons" />
                    <div>
                      <AiFillStar
                        className="star card-icons gold-fill"
                        style={{
                          display: 'block',
                        }}
                        onClick={() => {
                          const deletedFromFavorites = favorites.filter(
                            (fav) => fav.imdbID !== favorite.imdbID,
                          )
                          setFavorites(deletedFromFavorites)
                        }}
                      />
                    </div>
                    <Card.Body
                      onClick={() => {
                        history.push(
                          `/fullPlot/${favorite.Type}/${favorite.Title}`,
                        )
                      }}
                    >
                      <Card.Title>
                        {favorite.Title} ({favorite.Year})
                      </Card.Title>
                    </Card.Body>
                  </Card>
                ))}
                <div className="floating-buttons">
                  <Button
                    variant="outline-dark"
                    className="float-left custom-button"
                    onClick={handleShowFavoritesClear}
                  >
                    <AiOutlineClear /> Clear
                  </Button>
                </div>

                <Modal
                  show={showFavoritesClear}
                  onHide={handleCloseFavoritesClear}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Clear favorites list</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to clear your favorites list?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseFavoritesClear}
                    >
                      No
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setFavorites([])
                        handleCloseFavoritesClear()
                      }}
                    >
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Accordion.Body>
          )}
        </Accordion.Item>

        {movieLists.map((movielist, index) => (
          <Accordion.Item eventKey={(index + 1).toString()}>
            <Accordion.Header
              onClick={() => {
                const updateActiveKeys = activeAccordianItems.some(
                  (eventKey) => eventKey === (index + 1).toString(),
                )
                var newActiveKeys = []
                {
                  updateActiveKeys
                    ? (newActiveKeys = activeAccordianItems.filter(
                        (eventKey) => eventKey !== (index + 1).toString(),
                      ))
                    : (newActiveKeys = [
                        ...activeAccordianItems,
                        (index + 1).toString(),
                      ])
                }
                setActiveAccordianItems(newActiveKeys)
              }}
            >
              {movielist.name}
            </Accordion.Header>

            {movielist && movielist.list.length === 0 ? (
              <Accordion.Body>
                <Alert variant="light" className="align-left">
                  <p className="mb-0">
                    <Alert.Link href="/">Add movies</Alert.Link> to this movie
                    list!
                  </p>
                </Alert>
              </Accordion.Body>
            ) : (
              <Accordion.Body>
                <div className="favorites-mapping-container">
                  {movielist.list.map((movie) => (
                    <Card className="favorite-card col-6 col-xs-6 col-sm-5">
                      <Card.Img
                        src={movie.Poster}
                        onClick={() => {
                          history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                        }}
                      />

                      <AiOutlinePlusCircle className="add-to-list card-icons" />
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

                      <Card.Body
                        onClick={() => {
                          history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                        }}
                      >
                        <Card.Title>
                          {movie.Title} ({movie.Year})
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
                  <div className="floating-buttons">
                    <Button
                      variant="outline-dark"
                      className="float-left custom-button margin-right"
                      onClick={handleShowMovieListsClear}
                    >
                      <AiOutlineClear /> Clear
                    </Button>
                    <Button
                      variant="link"
                      className="float-left no-styling"
                      onClick={handleShowMovieListsDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="dark"
                      className="float-right custom-button"
                    >
                      <AiOutlineEdit /> Edit Name
                    </Button>
                  </div>

                  <Modal
                    show={showMovieListsClear}
                    onHide={handleCloseMovieListsClear}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Clear movie list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to clear {movielist.name}?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseMovieListsClear}
                      >
                        No
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          movielist.list = []
                          setMovieLists([...movieLists])
                          handleCloseMovieListsClear()
                        }}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showMovieListsDelete}
                    onHide={handleCloseMovieListsDelete}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Delete movie list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete {movielist.name}?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseMovieListsDelete}
                      >
                        No
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          const deletedFromAccordianList = movieLists.filter(
                            (list) =>
                              list.name !== movielist.name &&
                              list.list.imdbID !== movielist.imdbID,
                          )
                          setMovieLists(deletedFromAccordianList)
                          handleCloseMovieListsDelete()
                        }}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Accordion.Body>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}
