import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectStorage } from "../firebase/config";

const useStorage = (file) => {
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);

    storageRef.put(file).on("state_changed", (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
      setProgress(percentage);
    }, err => {
      setError(err)
    }, async () => {
      const profilePic = await storageRef.getDownloadURL();
      setProfilePic(profilePic);
    }) // async
  }, [file]);

  return { progress, profilePic, error };
}

export default useStorage;