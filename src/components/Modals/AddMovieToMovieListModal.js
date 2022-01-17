import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/movies-context'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { createNewMovieListWithNameAndMovie } from '../../utils/MovieListsUtils'

export default function AddMovieModal({
  showAddMovieList,
  handleAddMovieListClose,
  currentUser,
}) {
  const {
    movieLists,
    setMovieLists,
    name,
    setName,
    currentMovie,
    favorites,
  } = useContext(MoviesContext)

  return (
    <Modal show={showAddMovieList} onHide={handleAddMovieListClose}>
      <Modal.Header closeButton>
        <Modal.Title>Give your movie list a name.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == 'Enter' && name !== '') {
              // console.log(currentMovie)
              createNewMovieListWithNameAndMovie(
                name,
                currentMovie,
                movieLists,
                setMovieLists,
                setName,
                currentUser,
                favorites,
              )
              handleAddMovieListClose()
            }
          }}
        ></input>
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
            createNewMovieListWithNameAndMovie(
              name,
              currentMovie,
              movieLists,
              setMovieLists,
              setName,
              currentUser,
              favorites,
            )
            handleAddMovieListClose()
          }}
          disabled={movieLists.some((movielist) => movielist.name == name)}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
