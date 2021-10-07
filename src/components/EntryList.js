import React, { useState } from 'react'
import JournalEntry from './JournalEntry'


const EntryList = (props) => {
  const [selectedEntry, setSelectedEntry] = useState(props.selectedEntry); 
  // console.log('entrylist', props)

  const handleChangingSelectedEntry = title => {
    const entry = props.entryList.find(entry => entry.title === title);
    setSelectedEntry(entry);
    props.setSelectedEntry(entry);
  }
  console.log(selectedEntry);
  console.log('props sel', props.selectedEntry)
  
  return (
    <>
    {props.entryList.map(entry => {
      return <div key={entry.title}className="journal-entry">
        <JournalEntry
          whenEntryClicked={handleChangingSelectedEntry}
          title={entry.title}
          feeling={entry.feeling}
          incident={entry.incident} 
          reaction={entry.reaction}
          lessonslearned={entry.lessonslearned}
          reflection={entry.reflection}
          otherside={entry.otherside}
          date={entry.date}
          timeOpen={entry.timeOpen}
          key={Math.random()}
        />
      </div>
    })}
    </>
  )
}

export default EntryList;
