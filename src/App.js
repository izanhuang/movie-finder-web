import logo from './logo.svg'
import './App.css'
import { MoviesByTitle } from './components/MoviesByTitle'
import { Search } from './components/Search'
import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { MoviesContext } from './context/movies-context'

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')

  return (
    <Router>
      <MoviesContext.Provider value={{ movies, setMovies, title, setTitle }}>
        <div className="App">
          <p>
            <Link to="/" className="header">
              Movie Finder
            </Link>
          </p>
          <Switch>
            <Route exact path="/">
              <Home setMovies={setMovies} title={title} setTitle={setTitle} />
            </Route>
            <Route path="/movies-by-title">
              <MoviesByTitle
                movies={movies}
                title={title}
                setTitle={setTitle}
                setMovies={setMovies}
              />
            </Route>
          </Switch>
        </div>
      </MoviesContext.Provider>
    </Router>
  )
}

export default App
