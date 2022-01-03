import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'

export const FullPlot = () => {
  const { fullPlotType, fullPlotTitle } = useParams()
  const [fullPlot, setFullPlot] = useState('')

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

  return (
    <div>
      <h1>{fullPlotTitle}</h1>
      <div>
        <p>{fullPlot.type}</p>
        <p>IMDb ID: {fullPlot.imdbID}</p>
        <p>IMDb Rating: {fullPlot.imdbRating}</p>
        <p>IMDb Votes: {fullPlot.imdbVotes}</p>
        <img src={fullPlot.Poster} />
        <p>Actors: {fullPlot.Actors}</p>
        <p>Awards: {fullPlot.Awards}</p>
        <p>Box Office: {fullPlot.BoxOffice}</p>
        <p>Country: {fullPlot.Country}</p>
        <p>DVD: {fullPlot.DVD}</p>
        <p>Director: {fullPlot.Director}</p>
        <p>Genre: {fullPlot.Genre}</p>
        <p>Language: {fullPlot.Language}</p>
        <p>Metascore: {fullPlot.Metascore}</p>
        <p>Plot: {fullPlot.Plot}</p>
        <p>Production: {fullPlot.Production}</p>
        <p>Rated: {fullPlot.Rated}</p>
        <p>
          Ratings:{' '}
          {fullPlot.Ratings &&
            fullPlot.Ratings.map((rating) => (
              <div>
                <p>Source: {rating.Source}</p>
                <p>Value: {rating.Value}</p>
              </div>
            ))}
        </p>
        <p>Released: {fullPlot.Released}</p>
        <p>Runtime: {fullPlot.Runtime}</p>
        <p>Writer: {fullPlot.Writer}</p>
        <p>Year: {fullPlot.Year}</p>
      </div>
    </div>
  )
}
