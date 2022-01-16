import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/movies-context'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ClearFavoritesModal({
  showFavoritesClear,
  handleCloseFavoritesClear,
}) {
  const { setFavorites } = useContext(MoviesContext)
  return (
    <Modal show={showFavoritesClear} onHide={handleCloseFavoritesClear}>
      <Modal.Header closeButton>
        <Modal.Title>Clear favorites list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to clear your favorites list?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseFavoritesClear}>
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
  )
}
