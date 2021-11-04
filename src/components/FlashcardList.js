import React from 'react'
import Flashcard from './Flashcard'
import { Card } from 'react-bootstrap';

const FlashcardList = ({ selectedLesson, setSelectedLesson }) => {
  const entries = Object.entries(selectedLesson);
  console.log('selectedLesson', selectedLesson)
  const variant = 'Dark';
  return (
    <>
    <button onClick={() => setSelectedLesson(null)}>go back</button>
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
                  <Card.Title>Read more about ({flashcard[0]})</Card.Title>
                  <Card.Text>
                    {flashcard[1]}
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
