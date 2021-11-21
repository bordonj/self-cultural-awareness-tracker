import React from 'react'
import Flashcard from './Flashcard'
import { Card } from 'react-bootstrap';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const FlashcardList = ({ selectedLesson, setSelectedLesson }) => {
  const entries = Object.entries(selectedLesson);

  return (
    <>
    <button className="btn btn-warning" onClick={() => setSelectedLesson(null)}><KeyboardBackspaceIcon /></button>
      <div className="card-grid flexbox-container"> 
        {entries.map((flashcard, idx) => {
          if (flashcard[0] === "id") {
            return null;
          }
          if (flashcard[0] === 'Intro') {
            return (
              <Card key={idx}
                className="mb-2 intro"
              >
                <Card.Header as="h5">Introduction</Card.Header>
                <Card.Body>
                  <Card.Title>About {selectedLesson['id']}</Card.Title>
                  <Card.Text>
                    {Array.isArray(flashcard[1]) && flashcard[1].map((par, idx) => (
                      <span className='flashcard-p' key={idx}>
                        {par}
                      </span>
                    ))}
                    {typeof flashcard[1] === "string" && <span>{flashcard[1]}</span>}
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
