import React, { useState, useEffect } from "react";
import NewJournalEntry from "./NewJournalEntry";
import { useFirestoreConnect, useFirestore, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import firebase from "firebase/app";

const Journal = () => {
  const uid = localStorage.getItem('uid');
  console.log('uid', uid)
  useFirestoreConnect([
    { collection: 'users'}
  ]);
  
  // const firestore = useFirestore();
  

  const journals = useSelector(state => state.firestore.ordered.users)
  console.log('journals', journals)

  // hooks
  const [seeForm, setSeeForm] = useState(false);
  const [seeJournal, setSeeJournal] = useState(true)
  const [journalEntries, setJournalEntries] = useState([]);

  const onClickSetForm = (bool) => {
    setSeeForm(!bool);
    console.log('seeForm', seeForm)
  }

  if (seeForm === true) {
    return (
      <NewJournalEntry onNewJournalEntry={onClickSetForm} setForm={() => {onClickSetForm(seeForm)}}/>
    )
  }
  return (
    <>
    <h1>Your Journal Entries</h1>
    <hr />
    <button className="ui button" onClick={() => {onClickSetForm(seeForm)}}>Add new entry</button>
    </>
  )
}

export default Journal;