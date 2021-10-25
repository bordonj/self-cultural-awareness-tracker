import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFetchLessons = (collection) => {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const unsub = projectFirestore.collection(collection)
    //   .onSnapshot(doc => {
    //     setDocs(doc.data());
    //   })
    projectFirestore.collection(collection).onSnapshot(snap => {
      let documents = [];
      snap.forEach(doc => {
        documents.push({...doc.data(), id: doc.id})
      });
      setDocs(documents);
      setLoading(false);
    })

    // return unsub;
  }, [collection])

  console.log('docs', docs);

  return { docs, loading };
}

export default useFetchLessons
