import logo from './logo.svg'
import './App.css'
import { Movies } from './components/Movies'
import { Search } from './components/Search'
import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MoviesContext } from './context/movies-context'

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')

  return (
    <Router>
      <MoviesContext.Provider value={{ movies, setMovies, title, setTitle }}>
        <div className="App">
          <header>
            <p>Movie Finder</p>
          </header>
          <Switch>
            <Route exact path="/">
              <Home setMovies={setMovies} title={title} setTitle={setTitle} />
            </Route>
            <Route path="/movies">
              <Movies
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
