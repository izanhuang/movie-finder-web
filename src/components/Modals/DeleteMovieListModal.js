import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/movies-context'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function DeleteMovieListModal({
  showMovieListsDelete,
  handleCloseMovieListsDelete,
  currentMovieListName,
}) {
  const { movieLists, setMovieLists } = useContext(MoviesContext)
  return (
    <Modal show={showMovieListsDelete} onHide={handleCloseMovieListsDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete movie list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {currentMovieListName}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseMovieListsDelete}>
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
  )
}
