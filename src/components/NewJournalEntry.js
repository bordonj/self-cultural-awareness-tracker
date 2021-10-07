import React from "react";
import ReusableForm from "./ReusableForm";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

const NewJournalEntry = (props) => {
  console.log('new journal entry props', props)
  const firestore = useFirestore();
  const auth = firebase.auth();
  console.log('new journal entry auth', auth)
  
  function addJournalEntryToFirestore(event) {
    event.preventDefault();
    props.setForm();
    return firestore.collection('users').doc(auth.currentUser.uid).collection('journalEntries').add({
      title: event.target.title.value,
      feeling: event.target.feeling.value,
      incident: event.target.incident.value, 
      reaction: event.target.reaction.value,
      lessonslearned: event.target.lessonslearned.value,
      reflection: event.target.reflection.value,
      otherside: event.target.otherside.value,
      date: new Date(),
      timeOpen: firestore.FieldValue.serverTimestamp()
    });
  }

  return (
    <>
      <ReusableForm 
        hello="poop"
        submitForm={addJournalEntryToFirestore}
      />
    </>
  )
}

export default NewJournalEntry
