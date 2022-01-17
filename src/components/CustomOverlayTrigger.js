import React, { useContext } from 'react'
import { MoviesContext } from '../contexts/movies-context'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { addToMovieList } from '../utils/MovieListsUtils'

export default function CustomOverlayTrigger({
  componentName,
  movie,
  handleAddMovieListShow,
  currentUser,
}) {
  const {
    favorites,
    movieLists,
    setMovieLists,
    setName,
    setCurrentMovie,
  } = useContext(MoviesContext)

  return (
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
          {movieLists.map((movielist, index) => (
            <Popover.Body
              key={index}
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
      <button
        className={
          componentName == 'search'
            ? 'search-add-to-list card-icons'
            : componentName == 'favorites'
            ? 'add-to-list card-icons'
            : 'info-add-to-list info-card-icons'
        }
      >
        <AiOutlinePlusCircle />
      </button>
    </OverlayTrigger>
  )
}
