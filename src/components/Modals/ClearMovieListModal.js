import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/movies-context'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ClearMovieListModal({
  showMovieListsClear,
  handleCloseMovieListsClear,
  currentMovieListName,
}) {
  const { movieLists, setMovieLists } = useContext(MoviesContext)
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
            handleCloseMovieListsClear()
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
