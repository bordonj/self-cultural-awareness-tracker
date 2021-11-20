import React, { useState } from 'react'
import useFetchLessons from '../hooks/useFetchLessons'
import { motion } from 'framer-motion'
import { Spinner } from 'react-bootstrap'
import FlashcardList from './FlashcardList'
import './lessons.css'

const Lessons = () => {
  // const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const  { docs, loading } = useFetchLessons('lessons');
  const [selectedLesson, setSelectedLesson] = useState(null);
  console.log('selectedLesson', selectedLesson);
  console.log('lessons', docs);
  console.log('setSelectedLesson', setSelectedLesson);
  if (selectedLesson) {
    return (
      <FlashcardList selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson}/>

    )
  }
  return (
    <>
      { loading &&
        <div className="spinner-parent"> 
          <Spinner animation="border" role="status" id="spinner">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      }
      <div className="grid">
        { docs && docs.map ((doc, idx) => (
          <motion.div className="grid-wrap" key={doc.id}
            // whileHover={{ opacity: 1 }}
            // layout
          >
            <motion.div className="grid-item"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // transition={{ delay: 1 }}
            >
              <button onClick={() => setSelectedLesson(docs[idx])} className="btn btn-dark">{doc.id}</button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  
  // return (
  //   <>
  //     <FlashcardList flashcards={flashcards} />
  //   </>
    )
  
}

export default Lessons
