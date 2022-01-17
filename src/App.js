import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Dashboard from './components/Dashboard'
import { Favorites } from './components/Favorites/Favorites'
import ForgotPassword from './components/ForgotPassword'
import { FullPlot } from './components/FullPlot/FullPlot'
import Login from './components/Login'
import MyNavbar from './components/MyNavbar'
import { NotFound } from './components/NotFound'
import PrivateRoute from './components/PrivateRoute'
import { Search } from './components/Search/Search'
import { Signup } from './components/Signup/Signup'
import UpdateProfile from './components/UpdateProfile'
import { useAuth } from './contexts/AuthContext'
import { MoviesContext } from './contexts/movies-context'
import loadUserDocument from './utils/loadUserDocument'

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [favorites, setFavorites] = useState([])
  const [movieLists, setMovieLists] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [findByTitle, setFindByTitle] = useState('')
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [currentMovie, setCurrentMovie] = useState({})

  useEffect(() => {
    if (movies && movies.length > 0 && totalResults > 0) {
      notifyFoundResults(title, totalResults)
    } else if (
      title &&
      title.length > 0 &&
      movies == undefined &&
      totalResults == undefined
    ) {
      notifyNoResults(title)
    }
  }, [findByTitle])

  const notifyNoResults = (movieTitle) =>
    toast.error(
      'No results found for ' +
        movieTitle +
        '. Enter a different search term and try again.',
    )
  const notifyFoundResults = (movieTitle, totalResultsNum) =>
    toast.success(
      'Found ' + totalResultsNum + ' results found for ' + movieTitle,
    )

  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser && currentUser != null) {
      loadUserDocument(currentUser, setFavorites, setMovieLists)
    }
  }, [])

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
          findByTitle,
          setFindByTitle,
          setTotalResults,
          page,
          setPage,
          name,
          setName,
          currentMovie,
          setCurrentMovie,
        }}
      >
        <div className="App">
          <MyNavbar />
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route exact path="/fullplot/:fullPlotType/:fullPlotTitle">
              <FullPlot />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/signup">
              {currentUser != null ? <Redirect to="/dashboard" /> : <Signup />}
            </Route>
            <Route exact path="/login">
              {currentUser != null ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            ></PrivateRoute>
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
