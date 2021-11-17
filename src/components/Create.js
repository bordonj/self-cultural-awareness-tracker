import React, { useState } from 'react';
import PromptCarousel from './PromptCarousel';
import ComplexEntry from './ComplexEntry';
import SimpleEntry from './SimpleEntry';

const Create = () => {
  const [simpleEntry, setSimpleEntry] = useState(false);
  const [action, setAction] = useState('Add Simple Blog');

  const onClickAction = () => {
    if (action === 'Add Simple Blog') {
      setAction('Add Blog with multiple inputs');
    } else {
      setAction('Add Simple Blog');
    }
    setSimpleEntry(!simpleEntry);
  }

  return (
    <div className="create">
      <h2 onClick={onClickAction}>{action}</h2>
      <PromptCarousel />
      <br/>
      { !simpleEntry && <ComplexEntry />}
      { simpleEntry && <SimpleEntry />}
    </div>
  )
}

export default Create;
