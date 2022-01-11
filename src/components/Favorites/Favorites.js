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
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

export const Favorites = () => {
  const { favorites, setFavorites, movieLists, setMovieLists } = useContext(
    MoviesContext,
  )
  const [activeAccordianItems, setActiveAccordianItems] = useState(['0'])

  const [currentMovieListName, setCurrentMovieListName] = useState('')

  const [showFavoritesClear, setShowFavoritesClear] = useState(false)
  const handleCloseFavoritesClear = () => setShowFavoritesClear(false)
  const handleShowFavoritesClear = () => setShowFavoritesClear(true)

  const [showMovieListsClear, setShowMovieListsClear] = useState(false)
  const handleCloseMovieListsClear = () => setShowMovieListsClear(false)
  const handleShowMovieListsClear = (movieListName) => {
    setShowMovieListsClear(true)
    setCurrentMovieListName(movieListName)
  }

  const [showMovieListsDelete, setShowMovieListsDelete] = useState(false)
  const handleCloseMovieListsDelete = () => setShowMovieListsDelete(false)
  const handleShowMovieListsDelete = (movieListName) => {
    setShowMovieListsDelete(true)
    setCurrentMovieListName(movieListName)
  }

  const [name, setName] = useState('')
  const [currentMovie, setCurrentMovie] = useState({})

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

  useEffect(() => {
    // console.log(favorites)
  }, [favorites])

  useEffect(() => {
    // console.log(activeAccordianItems)
  }, [activeAccordianItems])

  function createNewMovieListWithNameAndMovie(name, movie) {
    movieLists[movieLists.length] = { name: name, list: [movie] }
    setMovieLists([...movieLists])
    setName('')
  }

  function addToMovieList(movielist, movieParam) {
    const index = movieLists.findIndex((list) => list == movielist)
    // console.log(movieLists[index].list, movieParam.imdbID)
    // console.log(
    //   !movieLists[index].list.some(
    //     (movie) => movie.imdbID == movieParam.imdbID,
    //   ),
    // )
    if (
      !movieLists[index].list.some((movie) => movie.imdbID == movieParam.imdbID)
    ) {
      movieLists[index].list = [...movieLists[index].list, movieParam]
      setMovieLists([...movieLists])
    }
  }

  function removeFromMovieList(movielist, movieParam) {
    const index = movieLists.findIndex((list) => list == movielist)
    const newMovieList = movieLists[index].list.filter(
      (movie) => movie.imdbID !== movieParam.imdbID,
    )
    movieLists[index].list = newMovieList
    setMovieLists([...movieLists])
  }

  useEffect(() => {
    console.log(movieLists)
  }, [movieLists])

  useEffect(() => {
    // console.log(name)
  }, [name])

  return (
    <div className="container favorites-container">
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

          {favorites && favorites.length == 0 ? (
            <Accordion.Body>
              <Alert variant="light" className="align-left">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <hr />
                <p className="mb-0">
                  ⭐ <Alert.Link href="/">Star movies</Alert.Link> to add them
                  to your favorites!
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
                    <OverlayTrigger
                      trigger="click"
                      key="bottom-start"
                      placement="bottom-start"
                      rootClose={true}
                      overlay={
                        <Popover id="popover-positioned-bottom-start">
                          <Popover.Header as="h3">
                            Add to movie list
                          </Popover.Header>
                          <Popover.Body className="popover-button">
                            <Button
                              variant="dark"
                              className="custom-button"
                              onClick={() => {
                                document.body.click()
                                setCurrentMovie(favorite)
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
                                addToMovieList(movielist, favorite)
                              }}
                            >
                              {movielist.name}
                            </Popover.Body>
                          ))}
                        </Popover>
                      }
                    >
                      <button className="add-to-list card-icons">
                        <AiOutlinePlusCircle />
                      </button>
                    </OverlayTrigger>
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
                    ➕ <Alert.Link href="/">Add movies</Alert.Link> to this
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

                      <OverlayTrigger
                        trigger="click"
                        key="bottom-start"
                        placement="bottom-start"
                        rootClose={true}
                        overlay={
                          <Popover id="popover-positioned-bottom-start">
                            <Popover.Header as="h3">
                              Add to movie list
                            </Popover.Header>
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
                        <button className="add-to-list card-icons">
                          <AiOutlinePlusCircle />
                        </button>
                      </OverlayTrigger>

                      <AiOutlineMinusSquare
                        className="card-icons remove-movie"
                        onClick={() => {
                          removeFromMovieList(movielist, movie)
                        }}
                      />

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
                      onClick={() => {
                        handleShowMovieListsClear(movielist.name)
                      }}
                    >
                      <AiOutlineClear /> Clear
                    </Button>
                    <Button
                      variant="link"
                      className="float-left no-styling"
                      onClick={() => {
                        handleShowMovieListsDelete(movielist.name)
                      }}
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
                      Are you sure you want to clear {currentMovieListName}?
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
                          const index = movieLists.findIndex(
                            (list) => list.name == currentMovieListName,
                          )
                          movieLists[index].list = []
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
                      Are you sure you want to delete {currentMovieListName}?
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
                            (list) => list.name !== currentMovieListName,
                          )
                          setMovieLists([...deletedFromAccordianList])
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
