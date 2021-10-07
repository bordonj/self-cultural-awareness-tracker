import React, { useState, useEffect } from "react";
import NewJournalEntry from "./NewJournalEntry";

const Journal = () => {
  const [seeForm, setSeeForm] = useState(false);
  const [seeJournal, setSeeJournal] = useState(true)
  const [journalEntries, setJournalEntries] = useState([]);

  const onClickSetForm = (bool) => {
    setSeeForm(!bool);
    console.log('seeForm', seeForm)
  }

  if (seeForm === true) {
    return (
      <NewJournalEntry onNewJournalEntry={onClickSetForm}/>
    )
  }
  return (
    <>
    <h1>Your Journal Entries</h1>
    <hr />
    <button className="ui button" onClick={() => {onClickSetForm(seeForm)}} >Add new entry</button>
    </>
  )
}

export default Journal;