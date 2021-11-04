import React from 'react'
import Flashcard from './Flashcard'
import { Card, Button } from 'react-bootstrap';

const FlashcardList = ({ selectedLesson, setSelectedLesson }) => {
  const entries = Object.entries(selectedLesson);
  console.log('selectedLesson', selectedLesson)

  return (
    <>
    <Button variant="dark" onClick={() => setSelectedLesson(null)}>go back</Button>
      <div className="card-grid flexbox-container"> 
        {entries.map(flashcard => {
          if (flashcard[0] === "id") {
            return <hr />
          }
          if (flashcard[0] === 'Intro') {
            return (
              <Card 
                className="mb-2 intro"
              >
                <Card.Header as="h5">Introduction</Card.Header>
                <Card.Body>
                  <Card.Title>About {selectedLesson['id']}</Card.Title>
                  <Card.Text>
                    {Array.isArray(flashcard[1]) && flashcard[1].map(par => (
                      <p>
                        {par}
                      </p>
                    ))}
                    {typeof flashcard[1] === "string" && <p>{flashcard[1]}</p>}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          }
          return <Flashcard flashcard={flashcard} key={flashcard[0]} />
        })}
      </div>
    </>

  )
}

export default FlashcardList
