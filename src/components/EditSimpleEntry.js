import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { projectFirestore } from '../firebase/config';

const EditSimpleEntry = ({ blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [feeling, setFeeling] = useState(blog.feeling);
  const [reflection, setReflection] = useState(blog.reflection);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const { id } = useParams(); 

  const handleSubmit = async e => {
    e.preventDefault();
    const newBlog = { title, feeling, reflection, date: blog.date}

    setLoading(true);

    await projectFirestore.collection('users').doc(uid).collection('journalEntries').doc(id).set(newBlog);

    setLoading(false);
    history.push('/entries');
  }

  return (
    <>
      <div className="create">
        <form onSubmit={handleSubmit}>
          <label>Blog Title:</label>
          <input 
            type="text" 
            placeholder="Was I in the wrong?"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Feeling:</label>
          <input 
            placeholder="Defensive but remorseful"
            value={feeling}
            onChange={e => setFeeling(e.target.value)}
            required
          />
          <label>Reflection:</label>
          <textarea
            style={{height: '150px'}}
            placeholder="I've thought more about how I could be insensitive because I've not as aware and ignorant of others feelings"
            value={reflection}
            onChange={e => setReflection(e.target.value)}
          />
          { !loading && <button>Add Blog</button>}
          { loading && <button disabled>Adding blog..</button>}
        </form>
      </div>
    </>
  )
}

export default EditSimpleEntry;
