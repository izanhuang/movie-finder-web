import logo from './logo.svg'
import './App.css'
import { Search } from './components/Search/Search'
import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { MoviesContext } from './context/movies-context'
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap'
import { FullPlot } from './components/FullPlot/FullPlot'
import { Favorites } from './components/Favorites/Favorites'
import { Login } from './components/Login/Login'

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [favorites, setFavorites] = useState([])

  return (
    <Router>
      <MoviesContext.Provider
        value={{ movies, setMovies, title, setTitle, favorites, setFavorites }}
      >
        <div className="App">
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
                    <Link to="/login">Login/Register</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Search
                movies={movies}
                title={title}
                setTitle={setTitle}
                setMovies={setMovies}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </Route>
            <Route exact path="/fullplot/:fullPlotType/:fullPlotTitle">
              <FullPlot />
            </Route>
            <Route exact path="/favorites">
              <Favorites favorites={favorites} setFavorites={setFavorites} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </MoviesContext.Provider>
    </Router>
  )
}

export default App
