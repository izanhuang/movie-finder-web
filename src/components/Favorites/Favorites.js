import React, { useContext, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {
  AiFillStar,
  AiOutlineClear,
  AiOutlineEdit,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../contexts/AuthContext'
import { MoviesContext } from '../../contexts/movies-context'
import { removeFromMovieList } from '../../utils/MovieListsUtils'
import updateUserDocument from '../../utils/updateUserDocument.js'
import CustomOverlayTrigger from '../CustomOverlayTrigger'
import CustomToastContainer from '../CustomToastContainer'
import FavoriteMovie from '../FavoriteMovie'
import AddMovieToMovieListModal from '../Modals/AddMovieToMovieListModal'
import ClearFavoritesModal from '../Modals/ClearFavoritesModal'
import ClearMovieListModal from '../Modals/ClearMovieListModal'
import DeleteMovieListModal from '../Modals/DeleteMovieListModal'
import EditMovieListNameModal from '../Modals/EditMovieListNameModal'
import './Favorites.css'

export const Favorites = () => {
  const { currentUser } = useAuth()
  const {
    favorites,
    setFavorites,
    movieLists,
    setMovieLists,
    name,
    setName,
  } = useContext(MoviesContext)
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

  const [showAddMovieList, setShowAddMovieList] = useState(false)

  const handleAddMovieListClose = () => {
    setShowAddMovieList(false)
    setName('')
  }
  const handleAddMovieListShow = () => {
    setShowAddMovieList(true)
    setName('')
  }

  const [showEditMovieLists, setShowEditMovieLists] = useState(false)
  const handleCloseEditMovieLists = () => {
    setShowEditMovieLists(false)
    setCurrentMovieListName('')
    setEditCurrentMovieListName('')
  }
  const handleShowEditMovieLists = (movieListName) => {
    setShowEditMovieLists(true)
    setCurrentMovieListName(movieListName)
  }

  const [editCurrentMovieListName, setEditCurrentMovieListName] = useState('')

  let history = useHistory()

  useEffect(() => {}, [favorites])

  useEffect(() => {}, [activeAccordianItems])

  useEffect(() => {}, [currentMovieListName])

  useEffect(() => {}, [movieLists])

  useEffect(() => {}, [name])

  return (
    <div className="container favorites-container">
      <h1 className="display-4 display-margin">Favorites</h1>

      <CustomToastContainer autoClose={2000} />

      <AddMovieToMovieListModal
        showAddMovieList={showAddMovieList}
        handleAddMovieListClose={handleAddMovieListClose}
        currentUser={currentUser}
      />

      {currentUser == null && (
        <Alert variant="info" className="align-left">
          <Link to="/signup">Create an account</Link> to save your favorites and
          movie list(s).
        </Alert>
      )}

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
                  ⭐ <Alert.Link href="/">Star</Alert.Link> movies to add them
                  to your favorites!
                </p>
              </Alert>
            </Accordion.Body>
          ) : (
            <Accordion.Body>
              <div className="favorites-mapping-container">
                {favorites.map((favorite, index) => (
                  <Card
                    key={index}
                    className="favorite-card col-6 col-xs-6 col-sm-5"
                  >
                    <Card.Img
                      src={
                        favorite.Poster == 'N/A'
                          ? 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
                          : favorite.Poster
                      }
                      onClick={() => {
                        history.push(
                          `/fullPlot/${favorite.Type}/${favorite.Title}`,
                        )
                      }}
                    />
                    {console.log(favorite.Poster)}
                    <CustomOverlayTrigger
                      componentName="favorites"
                      movie={favorite}
                      handleAddMovieListShow={handleAddMovieListShow}
                      currentUser={currentUser}
                    />
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
                          if (currentUser != null) {
                            updateUserDocument(
                              currentUser,
                              deletedFromFavorites,
                              movieLists,
                            )
                          }
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

                <ClearFavoritesModal
                  showFavoritesClear={showFavoritesClear}
                  handleCloseFavoritesClear={handleCloseFavoritesClear}
                  currentUser={currentUser}
                />
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
                    ➕ <Alert.Link href="/">Add</Alert.Link> movies to this
                    list!
                  </p>
                </Alert>
              </Accordion.Body>
            ) : (
              <Accordion.Body>
                <div className="favorites-mapping-container">
                  {movielist.list.map((movie, index) => (
                    <Card
                      key={index}
                      className="favorite-card col-6 col-xs-6 col-sm-5"
                    >
                      <Card.Img
                        src={
                          movie.Poster == 'N/A'
                            ? 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
                            : movie.Poster
                        }
                        onClick={() => {
                          history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                        }}
                      />
                      <CustomOverlayTrigger
                        componentName="favorites"
                        movie={movie}
                        handleAddMovieListShow={handleAddMovieListShow}
                        currentUser={currentUser}
                      />
                      <AiOutlineMinusSquare
                        className="card-icons remove-movie"
                        onClick={() => {
                          removeFromMovieList(
                            movielist,
                            movie,
                            movieLists,
                            setMovieLists,
                            currentUser,
                            favorites,
                          )
                        }}
                      />
                      <FavoriteMovie
                        componentName="favorites"
                        movie={movie}
                        currentUser={currentUser}
                      />
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
                      onClick={() => {
                        handleShowEditMovieLists(movielist.name)
                      }}
                    >
                      <AiOutlineEdit /> Edit Name
                    </Button>
                  </div>

                  <ClearMovieListModal
                    showMovieListsClear={showMovieListsClear}
                    handleCloseMovieListsClear={handleCloseMovieListsClear}
                    currentMovieListName={currentMovieListName}
                    currentUser={currentUser}
                  />

                  <DeleteMovieListModal
                    showMovieListsDelete={showMovieListsDelete}
                    handleCloseMovieListsDelete={handleCloseMovieListsDelete}
                    currentMovieListName={currentMovieListName}
                    currentUser={currentUser}
                  />

                  <EditMovieListNameModal
                    showEditMovieLists={showEditMovieLists}
                    handleShowEditMovieLists={handleShowEditMovieLists}
                    handleCloseEditMovieLists={handleCloseEditMovieLists}
                    editCurrentMovieListName={editCurrentMovieListName}
                    setEditCurrentMovieListName={setEditCurrentMovieListName}
                    movielist={movielist}
                    currentMovieListName={currentMovieListName}
                    currentUser={currentUser}
                  />
                </div>
              </Accordion.Body>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}
