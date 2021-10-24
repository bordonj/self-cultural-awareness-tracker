import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

const PicProgressBar = ({ picFile, setPicFile, setProfilePic}) => {
  const { profilePic, progress } = useStorage(picFile);

  useEffect(() => {
    if (profilePic) {
      setPicFile(null);
      setProfilePic(profilePic);
    }
  }, [profilePic, setPicFile, setProfilePic])

  return (
    <motion.div className="progress-bar" 
      initial={{ width: 0 }}
      animate={{ width: progress + '%'}}
    >
      {profilePic}
    </motion.div>
  )
}

export default PicProgressBar;