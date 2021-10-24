import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFetchProfile = (collection, uid) => {
  const [pending, setPending] = useState(true);
  const [doc, setDoc] = useState({})

  useEffect(() => {
    const docRef = projectFirestore.collection(collection).doc(uid);
    docRef.onSnapshot(doc => {
      setDoc(doc.data());
    })
    docRef.get().then(doc => {
      if (doc.exists) {
        setPending(false);
        setDoc(doc.data());
      } else {
        setPending(false);
      }
    }).catch(err => {
      setPending(false);
    });

  }, [collection, uid])

  return { doc, pending };
}

export default useFetchProfile;