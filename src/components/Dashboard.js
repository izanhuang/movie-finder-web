import React, { useState, useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Container from 'react-bootstrap/Container'
import loadMovieListDemo from '../utils/loadMovieListDemo'
import { MoviesContext } from '../contexts/movies-context'
import loadUserDocument from '../utils/loadUserDocument'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { setMovieLists, setFavorites } = useContext(MoviesContext)
  const history = useHistory()

  async function handleLogout() {
    setError('')
    try {
      await logout()
      setFavorites([])
      setMovieLists([])
      history.push('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  // useEffect(() => {
  //   if (currentUser != null) {
  //     loadUserDocument(currentUser, setFavorites, setMovieLists)
  //   }
  // }, [])

  return (
    <Container
      className="d-flex align-items-center justify-content-center text-align"
      style={{ minHieght: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="display-4 display-margin">Profile</h1>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: </strong>
            {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button
            variant="link"
            className="logout-button"
            onClick={() => {
              handleLogout()
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  )
}
