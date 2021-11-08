import { Search } from './Search'
import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  let history = useHistory()

  return (
    <div className="select-wrapper">
      <div className="select-spacing">
        <button
          className="select-button"
          onClick={() => history.push('/movies-by-title')}
        >
          Title
        </button>
        <p>Search by title</p>
      </div>
      <div className="select-spacing">
        <button className="select-button">Actor</button>
        <p>Search by actor</p>
      </div>
      <div className="select-spacing">
        <button className="select-button">Pick for Me</button>
        <p>Pick a movie for me</p>
      </div>
    </div>
  )
}

export default Home
