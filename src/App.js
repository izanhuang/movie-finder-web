import logo from './logo.svg'
import './App.css'
import { Search } from './components/Search/Search'
import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { MoviesContext } from './contexts/movies-context'
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
import { Signup } from './components/Signup/Signup'
import { NotFound } from './components/NotFound'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'
import MyNavbar from './components/MyNavbar'
import { EmptyMovieListDemo, MovieListDemo } from './utils/MovieListDemo'
import { useAuth } from './contexts/AuthContext'
import db from './firebase'
import { onSnapshot, collection, setDoc, getDoc, doc } from 'firebase/firestore'
import loadMovieListDemo from './utils/loadMovieListDemo'
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

  const currentUser = useAuth()

  // useEffect(() => {
  //   // if (currentUser == undefined) {
  //   //   loadMovieListDemo(setFavorites, setMovieLists)
  //   // }
  //   if (currentUser != undefined) {
  //     loadUserDocument(currentUser, setFavorites, setMovieLists)
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('Load on login on not null: ', currentUser)
  //   if (currentUser != undefined) {
  //     return loadUserDocument(currentUser, setFavorites, setMovieLists)
  //   }
  // }, [currentUser])

  // const handleEdit = async () => {
  //   if (currentUser) {
  //     const docRef = doc(db, 'UserMovieLists', currentUser.uid)
  //     const payload = { favorites, movieLists }
  //     await setDoc(docRef, payload)
  //   }
  // }

  // const handleAddDemo = async () => {
  //   const docRef = doc(db, 'UserMovieLists', 'Demo')
  //   const payload = { favorites, movieLists }
  //   await setDoc(docRef, payload)
  //   console.log('Added Demo')
  // }

  // const handleLogOutReset = async () => {
  //   const docRef = doc(db, 'UserMovieLists', 'Demo')
  //   await getDoc(docRef)
  // }

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
        <AuthProvider>
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
                <Container
                  className="d-flex align-items-center justify-content-center text-align"
                  style={{ minHieght: '100vh' }}
                >
                  <Signup />
                </Container>
              </Route>
              <Route exact path="/login">
                <Container
                  className="d-flex align-items-center justify-content-center text-align"
                  style={{ minHieght: '100vh' }}
                >
                  <Login />
                </Container>
              </Route>
              <Route exact path="/forgot-password">
                <Container
                  className="d-flex align-items-center justify-content-center text-align"
                  style={{ minHieght: '100vh' }}
                >
                  <ForgotPassword />
                </Container>
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
        </AuthProvider>
      </MoviesContext.Provider>
    </Router>
  )
}

export default App
