import React, { useState } from 'react'
import useFetchLessons from '../hooks/useFetchLessons'
import { motion } from 'framer-motion'
import Modal from './Modal'
import { Spinner } from 'react-bootstrap'

const Lessons = () => {
  const  { docs, loading } = useFetchLessons('lessons');
  const [selectedLesson, setSelectedLesson] = useState(null);
  console.log('selectedLesson', selectedLesson);
  console.log('lessons', docs);
  console.log('setSelectedLesson', setSelectedLesson);
  if (selectedLesson) {
    return (
      <Modal selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson}/>
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
            whileHover={{ opacity: 1}}
            layout
            onClick={() => setSelectedLesson(docs[idx])}
          >
            <motion.div className="grid-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h1>{doc.id}</h1>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
    )
  
}

export default Lessons
