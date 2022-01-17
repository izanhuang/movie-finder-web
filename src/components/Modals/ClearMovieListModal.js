import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/movies-context'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import updateUserDocument from '../../utils/updateUserDocument'

export default function ClearMovieListModal({
  showMovieListsClear,
  handleCloseMovieListsClear,
  currentMovieListName,
  currentUser,
}) {
  const { favorites, movieLists, setMovieLists } = useContext(MoviesContext)
  return (
    <Modal show={showMovieListsClear} onHide={handleCloseMovieListsClear}>
      <Modal.Header closeButton>
        <Modal.Title>Clear movie list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to clear {currentMovieListName}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseMovieListsClear}>
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
            if (currentUser != null) {
              updateUserDocument(currentUser, favorites, movieLists)
            }
            handleCloseMovieListsClear()
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
