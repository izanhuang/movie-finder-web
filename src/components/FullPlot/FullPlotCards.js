import React from 'react'
import Card from 'react-bootstrap/Card'

export default function AdditionalDetailsCards({ fullPlot }) {
  return (
    <div className="additional-details">
      <Card>
        <Card.Header>Ratings</Card.Header>
        <Card.Body>
          {fullPlot.Ratings &&
            fullPlot.Ratings.map((rating, index) => (
              <Card.Text key={index}>
                {rating.Source} - {rating.Value}
              </Card.Text>
            ))}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Production</Card.Header>
        <Card.Body>
          <Card.Text>Released: {fullPlot.Released}</Card.Text>
          {fullPlot.DVD ? <Card.Text>DVD: {fullPlot.DVD}</Card.Text> : ''}
          {fullPlot.Director ? (
            <Card.Text>Director: {fullPlot.Director}</Card.Text>
          ) : (
            ''
          )}
          <Card.Text>Writer: {fullPlot.Writer}</Card.Text>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Additional Details</Card.Header>
        <Card.Body>
          {fullPlot.BoxOffice ? (
            <Card.Text>
              Box Office (Gross US &#38; Canada): {fullPlot.BoxOffice}
            </Card.Text>
          ) : (
            ''
          )}
          <Card.Text>Awards: {fullPlot.Awards}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
