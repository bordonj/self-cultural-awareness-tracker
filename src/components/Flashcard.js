import React, { useState } from 'react'

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  console.log(flip);
  return (
    <div 
      className={ `flashcard ${flip ? `flip` : ''} flex-item`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        {flashcard[0]}
      </div>
      <div className="back">
        {flashcard[1]}
      </div>
    </div>
  )
}

export default Flashcard
