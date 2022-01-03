import { Search } from '../Search/Search'
import React from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'

function Home() {
  let history = useHistory()

  return (
    <div className="select-wrapper">
      <div className="select-spacing">
        <button
          className="select-button"
          onClick={() => history.push('/search')}
        >
          Search
        </button>
        <p>Find movies</p>
      </div>
      <div className="select-spacing">
        <button className="select-button">Pick for Me</button>
        <p>Pick a movie for me</p>
      </div>
    </div>
  )
}

export default Home
