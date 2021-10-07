import React, { useState, useEffect } from "react";
import NewJournalEntry from "./NewJournalEntry";
import { useFirestoreConnect, useFirestore, isLoaded, firestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import axios from "axios";
import { compose } from "redux";
import { connect } from "react-redux";


const Journal = () => {
  const uid = localStorage.getItem('uid');
  const firestore = useFirestore();
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const fetchJournalEntries = async () => {
      const response = firestore.collection('users').doc(uid).collection('journalEntries');
      const data = await response.get();
      data.docs.map(item => {
        let newItem = item.data();
        setEntries(oldArray => [...oldArray, newItem]);
        console.log('journal entry', item.data())
      })
    }
    fetchJournalEntries();
  }, [])


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
    {entries.map((entry, i) => {
      return (
          <div key={i}>
            <h1>{entry.title}</h1>
          </div>
        )
      })}
    <hr />
    <button className="ui button" onClick={() => {onClickSetForm(seeForm)}}>Add new entry</button>
    </>
  )
}

export default Journal;