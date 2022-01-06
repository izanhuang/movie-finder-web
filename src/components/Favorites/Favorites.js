import React, { useContext, useEffect, useState } from 'react'
import './Favorites.css'
import { MoviesContext } from '../../context/movies-context'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import { useHistory } from 'react-router-dom'
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineClear,
} from 'react-icons/ai'

export const Favorites = () => {
  const { favorites, setFavorites } = useContext(MoviesContext)
  const [activeAccordianItems, setActiveAccordianItems] = useState(['0'])
  const [movieLists, setMovieLists] = useState([
    {
      name: 'Movie List #2',
      list: [
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
          Title: 'The Avengers',
          Type: 'movie',
          Year: '2012',
          imdbID: 'tt0848228',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
          Title: 'Avengers: Endgame',
          Type: 'movie',
          Year: '2019',
          imdbID: 'tt4154796',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
          Title: 'Avengers: Infinity War',
          Type: 'movie',
          Year: '2018',
          imdbID: 'tt4154756',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
          Title: 'Avengers: Age of Ultron',
          Type: 'movie',
          Year: '2015',
          imdbID: 'tt2395427',
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
          Title: "Harry Potter and the Sorcerer's Stone",
          Type: 'movie',
          Year: '2001',
          imdbID: 'tt0241527',
        },
      ],
    },
  ])

  let history = useHistory()

  useEffect(() => {
    console.log(favorites)
  }, [favorites])

  useEffect(() => {
    console.log(activeAccordianItems)
  }, [activeAccordianItems])

  return (
    <div className="container favorites-container">
      <Accordion defaultActiveKey={activeAccordianItems} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => {
              const updateActiveKeys = activeAccordianItems.some(
                (eventKey) => eventKey === '0',
              )
              var newActiveKeys = []
              {
                updateActiveKeys
                  ? (newActiveKeys = activeAccordianItems.filter(
                      (eventKey) => eventKey !== '0',
                    ))
                  : (newActiveKeys = [...activeAccordianItems, '0'])
              }
              setActiveAccordianItems(newActiveKeys)
            }}
          >
            Favorites
          </Accordion.Header>
          <Accordion.Body>
            <div className="favorites-mapping-container">
              {favorites.map((favorite) => (
                <Card className="favorite-card col-6 col-xs-6 col-sm-5">
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
              <div className="floating-buttons">
                <button
                  className="float-left custom-button"
                  onClick={() => {
                    setFavorites([])
                  }}
                >
                  <AiOutlineClear /> Clear
                </button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {movieLists.map((movielist, index) => (
          <Accordion.Item eventKey={(index + 1).toString()}>
            <Accordion.Header
              onClick={() => {
                const updateActiveKeys = activeAccordianItems.some(
                  (eventKey) => eventKey === (index + 1).toString(),
                )
                var newActiveKeys = []
                {
                  updateActiveKeys
                    ? (newActiveKeys = activeAccordianItems.filter(
                        (eventKey) => eventKey !== (index + 1).toString(),
                      ))
                    : (newActiveKeys = [
                        ...activeAccordianItems,
                        (index + 1).toString(),
                      ])
                }
                setActiveAccordianItems(newActiveKeys)
              }}
            >
              {movielist.name}
            </Accordion.Header>
            <Accordion.Body>
              <div className="favorites-mapping-container">
                {movielist.list.map((movie) => (
                  <Card className="favorite-card col-6 col-xs-6 col-sm-5">
                    <Card.Img
                      src={movie.Poster}
                      onClick={() => {
                        history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                      }}
                    />

                    <AiOutlinePlusCircle className="add-to-list card-icons" />
                    <div>
                      <AiOutlineStar
                        className="search-star card-icons"
                        style={{
                          display: favorites.some(
                            (fav) =>
                              fav.Poster === movie.Poster &&
                              fav.Title === movie.Title &&
                              fav.Year === movie.Year,
                          )
                            ? 'none'
                            : 'block',
                        }}
                        onClick={() => {
                          if (
                            !favorites.some(
                              (fav) =>
                                fav.Poster === movie.Poster &&
                                fav.Title === movie.Title &&
                                fav.Year === movie.Year,
                            )
                          ) {
                            const addedToFavorites = [...favorites, movie]
                            setFavorites(addedToFavorites)
                          }
                        }}
                      />

                      <AiFillStar
                        className="star card-icons gold-fill"
                        style={{
                          display: favorites.some(
                            (fav) =>
                              fav.Poster === movie.Poster &&
                              fav.Title === movie.Title &&
                              fav.Year === movie.Year,
                          )
                            ? 'block'
                            : 'none',
                        }}
                        onClick={() => {
                          const deletedFromFavorites = favorites.filter(
                            (fav) => fav.imdbID !== movie.imdbID,
                          )
                          setFavorites(deletedFromFavorites)
                        }}
                      />
                    </div>

                    <Card.Body
                      onClick={() => {
                        history.push(`/fullPlot/${movie.Type}/${movie.Title}`)
                      }}
                    >
                      <Card.Title>
                        {movie.Title} ({movie.Year})
                      </Card.Title>
                    </Card.Body>
                  </Card>
                ))}
                <div className="floating-buttons">
                  <button
                    className="float-left custom-button"
                    onClick={() => {
                      const deletedFromAccordianList = movieLists.filter(
                        (list) =>
                          list.name !== movielist.name &&
                          list.list.imdbID !== movielist.imdbID,
                      )
                      setMovieLists(deletedFromAccordianList)
                    }}
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                  <button className="float-right custom-button">
                    <AiOutlineEdit /> Edit Name
                  </button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}
