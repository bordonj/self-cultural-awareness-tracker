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
  console.log('uid', uid)
  useFirestoreConnect([
    { collection: 'users'}
  ]);
  
  const firestore = useFirestore();
  

  // const journals = useSelector(state => state.firestore.ordered.users)
  const journals = useSelector(state => state.firestore.ordered.users)
  console.log('journals', journals)

  const sfRef = firestore.collection('users').doc(uid);
  const collections = async () => {
    await sfRef.listCollections();
  };
  console.log('collections', collections)
  // collections.forEach(collection => {
  //   console.log('Found subcollection with id:', collection.id);
  // });

  // const getJournals = () => {
  //   let docs =  firestore.collection('users').doc(uid).collection('journalEntries').doc('ArqR9HClYfrE2VxuWCZA').get()
  //     .then(res => {
  //       console.log('OMGAHDKAHASDFA', res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     });
  //   console.log('docs', docs)
  // };
  // getJournals();

  const [blogs,setBlogs] = useState([])
  const fetchBlogs = async () => {
    const response = firestore.collection('users').doc(uid).collection('journalEntries');
    const data = await response.get();
    data.docs.forEach(item=>{
    // setBlogs([...blogs, item.data()])
    console.log(item.data())
    })
  }
  useEffect(() => {
    fetchBlogs();
  }, [])
  console.log('blahbs', blogs)

  // const getJournal = () => {
  //   firestore.collection('users').doc(uid).collection('journalEntries').get()
  //     .then(response => {
  //       response.forEach(document => {
  //         console.log('mASFAJDF', document)
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }
  // getJournal();

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