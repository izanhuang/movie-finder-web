import { Search } from './Search'
import React from 'react'
import { useHistory } from 'react-router-dom'

function Home() {
  let history = useHistory()

  return (
    <div>
      <Search history={history} />
    </div>
  )
}

export default Home
