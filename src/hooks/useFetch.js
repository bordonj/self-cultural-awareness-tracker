import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFetch = (collection, uid, id) => {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState({})

  useEffect(() => {
    const docRef = projectFirestore.collection(collection).doc(uid).collection('journalEntries').doc(id);

    docRef.get().then(doc => {
      if (doc.exists) {
        setLoading(false);
        setDoc(doc.data());
      } else {
        setLoading(false);
      }
    }).catch(err => {
      setLoading(false);
    });

  }, [collection, id, uid])

  return { doc, loading };
}

export default useFetch;