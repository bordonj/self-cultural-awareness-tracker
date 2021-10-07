import React from 'react'

function JournalEntry(props) {
  const newdate = new Date(props.date.seconds * 1000).toString();
  // console.log('newdate', newdate)


  return (
    <>
      <div onClick = {() => props.whenEntryClicked(props.title)}>
        <h3>Title: {props.title}</h3>
        {/* <p><em>{props.feeling}</em></p> */}
        <p><em>{newdate}</em></p>
      </div>
      <hr/>
    </>
  )
}

export default JournalEntry
