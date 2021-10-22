import React from 'react'
import { Margin } from './Lessons';

function EntryDetail(props) {
  const { entry } = props;

  return (
    <>
    <Margin>
      <h1>Title: {entry.title}</h1>
      <p>incident: {entry.incident}</p>
      <p>feeling: {entry.feeling}</p>
      <p>reaction: {entry.reaction}</p>
      <p>other side: {entry.otherside}</p>
      <p>Title: {entry.title}</p>
      <p>reflection: {entry.reflection}</p>
      <p>lessons learned: {entry.lessonslearned}</p>
      <button className="ui button grey" onClick={props.backToList}>back to journals</button>
    </Margin>
    </>
  )
}

export default EntryDetail
