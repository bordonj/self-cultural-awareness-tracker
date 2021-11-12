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
        {Array.isArray(flashcard[1]) && flashcard[1].map((par, idx) => (
          <div className="flashcard-p" key={idx}>
            {par}
          </div>
        ))}
        {typeof flashcard[1] === "string" && <p>{flashcard[1]}</p>}
      </div>
    </div>
  )
}

export default Flashcard
