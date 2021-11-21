import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditComplexEntry from './EditComplexEntry'
import EditSimpleEntry from './EditSimpleEntry';

const Edit = ({blog}) => {
  const [simpleEntry, setSimpleEntry] = useState(false);
  const [action, setAction] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (blog.incident) {
      setAction('Update simple Blog')
    } else {
      setAction('Update Blog with multiple inputs')
      setSimpleEntry(true);
    }
  }, [blog])
  
  const onClickAction = () => {
    if (action === 'Update Simple Blog') {
  setAction('Update Blog with multiple inputs');
    } else {
      setAction('Update Simple Blog');
    }
    setSimpleEntry(!simpleEntry);
  }

  return (
    <>
      <button id="back" onClick={() => history.push('/entries')}>< KeyboardBackspaceIcon/></button>
      <div className="create">
        <h2 onClick={onClickAction}>{action}</h2>
        { !simpleEntry && <EditComplexEntry blog={blog}/>}
        { simpleEntry && <EditSimpleEntry  blog={blog}/>}
      </div>
    </>
  )
}

export default Edit;
