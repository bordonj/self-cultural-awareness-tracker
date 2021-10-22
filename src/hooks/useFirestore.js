import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection, uid) => {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection).doc(uid).collection('journalEntries')
    .orderBy('date', 'desc')
      .onSnapshot((snap)=> {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id})
        });
        setDocs(documents);
        setLoading(false);
      });

    return () => unsub();

  }, [collection])

  return { docs, loading };
}

export default useFirestore;