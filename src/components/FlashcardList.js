import React from 'react'
import Flashcard from './Flashcard'

const FlashcardList = ({ selectedLesson, setSelectedLesson }) => {
  const entries = Object.entries(selectedLesson);
  console.log('selectedLesson', selectedLesson)
  return (
    <>
    <button onClick={() => setSelectedLesson(null)}>go back</button>
      <div className="card-grid"> 
        {entries.map(flashcard => {
          if (flashcard[0] === "id") {
            return <hr />
          }
          return <Flashcard flashcard={flashcard} key={flashcard[0]} />
        })}
      </div>
    </>

  )
}

export default FlashcardList
