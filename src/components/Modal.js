import React from "react";
import { motion } from "framer-motion";
import Button from "@restart/ui/esm/Button";

const Modal = ({ selectedLesson, setSelectedLesson }) => {
  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedLesson(null);
    }
  }
  const keys = Object.keys(selectedLesson);
  const entries = Object.entries(selectedLesson);
  console.log('KEYS', keys)
  console.log('ENTRIES', entries)
  
  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div alt="enlarged pic" initial={{ y: "-100vh" }} animate={{ y: 0 }}/>
      { entries && entries.map(entry => (
        <React.Fragment key={entry}>
          <div>
            <h4>{entry[0]}</h4>
            <p>{entry[1]}</p>
          </div>
        </React.Fragment>
      ))}
      {/* <Button onClick={() => setSelectedLesson(null)}>Back</Button> */}
    </motion.div>
  )
}

export default Modal;