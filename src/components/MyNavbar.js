import React, { useEffect, useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MoviesContext } from '../contexts/movies-context'
import { useAuth } from '../contexts/AuthContext'

export default function MyNavbar() {
  const { setMovies, setTitle } = useContext(MoviesContext)

  const { currentUser } = useAuth()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            onClick={() => {
              setMovies([])
              setTitle('')
            }}
            className="header"
          >
            Movie Finder
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Search</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/favorites">Favorites</Link>
            </Nav.Link>
            <Nav.Link>
              {currentUser == null ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/dashboard">Profile</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
