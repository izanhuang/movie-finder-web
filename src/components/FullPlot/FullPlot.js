import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import './FullPlot.css'
import { MoviesContext } from '../../contexts/movies-context'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../contexts/AuthContext'
import CustomToastContainer from '../CustomToastContainer'
import AddMovieToMovieListModal from '../Modals/AddMovieToMovieListModal'
import CustomOverlayTrigger from '../CustomOverlayTrigger'
import FavoriteMovie from '../FavoriteMovie'
import FullPlotCards from './FullPlotCards'

export const FullPlot = () => {
  const { currentUser } = useAuth()
  const { fullPlotType, fullPlotTitle } = useParams()
  const [fullPlot, setFullPlot] = useState('')
  const { movieLists, setName } = useContext(MoviesContext)
  const [showAddMovieList, setShowAddMovieList] = useState(false)

  const handleAddMovieListClose = () => {
    setShowAddMovieList(false)
    setName('')
  }
  const handleAddMovieListShow = () => {
    setShowAddMovieList(true)
    setName('')
  }

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?t=${fullPlotTitle}&type=${fullPlotType}&plot=full&apikey=6fe3dbba`,
      )
      .then((res) => {
        const fullPlot = res.data
        setFullPlot(fullPlot)
      })

      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {}, [movieLists])

  return (
    <div className="container movie-info">
      <CustomToastContainer autoClose={2000} />
      <AddMovieToMovieListModal
        showAddMovieList={showAddMovieList}
        handleAddMovieListClose={handleAddMovieListClose}
        currentUser={currentUser}
      />
      <div className="info-header">
        <h1>{fullPlotTitle}</h1>
        <CustomOverlayTrigger
          componentName="info"
          movie={fullPlot}
          handleAddMovieListShow={handleAddMovieListShow}
          currentUser={currentUser}
        />
        <FavoriteMovie componentName="info" movie={fullPlot} />
      </div>
      <div>
        <div className="fixed-row text-muted">
          <div>{fullPlot.Year}</div>
          <span className="dot"></span>
          <div>{fullPlot.Rated}</div>
          <span className="dot"></span>
          <div>{fullPlot.Runtime}</div>
        </div>

        <div className="flex-start">
          <div className="flex-start-left">
            <img
              className="movie-poster"
              src={
                fullPlot.Poster == 'N/A'
                  ? 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
                  : fullPlot.Poster
              }
            />
          </div>

          <div className="flex-start-right">
            <div className="fixed-row imdb">
              <div>
                <p>IMDb ID: {fullPlot.imdbID}</p>
              </div>
              <span></span>
              <div>
                <p>IMDb Rating: {fullPlot.imdbRating}</p>
              </div>
              <span></span>
              <div>
                <p>IMDb Votes: {fullPlot.imdbVotes}</p>
              </div>
            </div>

            <div>Actors: </div>
            <p className="movie-div">{fullPlot.Actors}</p>

            <div>Plot: </div>
            <p className="movie-div">{fullPlot.Plot}</p>

            <div>Genre: </div>
            <p className="movie-div" className="movie-div">
              {fullPlot.Genre}
            </p>

            <div>Language: </div>
            <p className="movie-div">{fullPlot.Language}</p>

            <div>Country: </div>
            <p className="movie-div">{fullPlot.Country}</p>
          </div>
        </div>

        <FullPlotCards fullPlot={fullPlot} />
      </div>
    </div>
  )
}
