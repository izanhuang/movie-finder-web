import React, { useContext, useEffect } from 'react'
import './Favorites.css'
import { MoviesContext } from '../../context/movies-context'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import { useHistory } from 'react-router-dom'
import { AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai'

export const Favorites = () => {
  const { favorites, setFavorites } = useContext(MoviesContext)

  let history = useHistory()

  useEffect(() => {
    console.log(favorites)
  }, [favorites])
  return (
    <div className="container favorites-container">
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Favorites</Accordion.Header>
          <Accordion.Body>
            <div className="favorites-mapping-container">
              {favorites.map((favorite) => (
                <Card className="favorite-card col-5">
                  <Card.Img
                    src={favorite.Poster}
                    onClick={() => {
                      history.push(
                        `/fullPlot/${favorite.Type}/${favorite.Title}`,
                      )
                    }}
                  />
                  <AiOutlinePlusCircle className="add-to-list card-icons" />
                  <div>
                    <AiFillStar
                      className="star card-icons gold-fill"
                      style={{
                        display: 'block',
                      }}
                      onClick={() => {
                        const deletedFromFavorites = favorites.filter(
                          (fav) => fav.imdbID !== favorite.imdbID,
                        )
                        setFavorites(deletedFromFavorites)
                      }}
                    />
                  </div>
                  <Card.Body
                    onClick={() => {
                      history.push(
                        `/fullPlot/${favorite.Type}/${favorite.Title}`,
                      )
                    }}
                  >
                    <Card.Title>
                      {favorite.Title} ({favorite.Year})
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Movie List #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
