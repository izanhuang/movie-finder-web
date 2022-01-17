import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/movies-context'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import updateUserDocument from '../../utils/updateUserDocument'

export default function EditMovieListNameModal({
  showEditMovieLists,
  handleShowEditMovieLists,
  handleCloseEditMovieLists,
  editCurrentMovieListName,
  setEditCurrentMovieListName,
  movielist,
  currentMovieListName,
  currentUser,
}) {
  const { movieLists, setMovieLists, favorites } = useContext(MoviesContext)
  return (
    <Modal show={showEditMovieLists} onHide={handleCloseEditMovieLists}>
      <Modal.Header closeButton>
        <Modal.Title>Edit movie list name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={editCurrentMovieListName}
          onChange={(e) => setEditCurrentMovieListName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == 'Enter' && editCurrentMovieListName !== '') {
              handleShowEditMovieLists(movielist.name)
              const index = movieLists.findIndex(
                (list) => list.name == currentMovieListName,
              )
              movieLists[index].name = editCurrentMovieListName
              setMovieLists([...movieLists])
              if (currentUser != null) {
                updateUserDocument(currentUser, favorites, movieLists)
              }
              handleCloseEditMovieLists()
            }
          }}
        ></input>
      </Modal.Body>
      <Modal.Body
        className="no-padding-top"
        style={{
          display: movieLists.some(
            (movielist) => movielist.name == editCurrentMovieListName,
          )
            ? 'block'
            : 'none',
        }}
      >
        This movie list name already exists.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            if (editCurrentMovieListName !== '') {
              const index = movieLists.findIndex(
                (list) => list.name == currentMovieListName,
              )
              movieLists[index].name = editCurrentMovieListName
              setMovieLists([...movieLists])
              handleCloseEditMovieLists()
            }
          }}
          disabled={movieLists.some(
            (movielist) => movielist.name == editCurrentMovieListName,
          )}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
