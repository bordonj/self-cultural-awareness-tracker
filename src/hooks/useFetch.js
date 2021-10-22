import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFetch = (collection, uid, id) => {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState({})

  useEffect(() => {
    const docRef = projectFirestore.collection(collection).doc(uid).collection('journalEntries').doc(id);

    docRef.get().then(doc => {
      if (doc.exists) {
        console.log('doc data', doc.data());
        setLoading(false);
        setDoc(doc.data());
      } else {
        console.log('no such doc');
        setLoading(false);
      }
    }).catch(err => {
      console.log('err getting doc', err);
      setLoading(false);
    });

  }, [collection, id, uid])

  return { doc, loading };
}

export default useFetch;