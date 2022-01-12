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
import { NotFound } from './components/NotFound/NotFound'

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [favorites, setFavorites] = useState([])
  const [movieLists, setMovieLists] = useState([
    {
      name: 'Movie List Demo',
      list: [
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
          Title: 'The Avengers',
          Type: 'movie',
          Year: '2012',
          imdbID: 'tt0848228',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
          Title: 'Avengers: Endgame',
          Type: 'movie',
          Year: '2019',
          imdbID: 'tt4154796',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
          Title: 'Avengers: Infinity War',
          Type: 'movie',
          Year: '2018',
          imdbID: 'tt4154756',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
          Title: 'Avengers: Age of Ultron',
          Type: 'movie',
          Year: '2015',
          imdbID: 'tt2395427',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
          Title: "Harry Potter and the Sorcerer's Stone",
          Type: 'movie',
          Year: '2001',
          imdbID: 'tt0241527',
        },
      ],
    },
  ])

  return (
    <Router>
      <MoviesContext.Provider
        value={{
          movies,
          setMovies,
          title,
          setTitle,
          favorites,
          setFavorites,
          movieLists,
          setMovieLists,
        }}
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
                movieLists={movieLists}
                setMovieLists={setMovieLists}
              />
            </Route>
            <Route exact path="/fullplot/:fullPlotType/:fullPlotTitle">
              <FullPlot />
            </Route>
            <Route exact path="/favorites">
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                movieLists={movieLists}
                setMovieLists={setMovieLists}
              />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </MoviesContext.Provider>
    </Router>
  )
}

export default App
