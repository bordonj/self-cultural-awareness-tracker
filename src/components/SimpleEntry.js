import { useState } from "react";
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { projectFirestore } from '../firebase/config';

const SimpleEntry = () => {
  const [title, setTitle] = useState('');
  const [feeling, setFeeling] = useState('');
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const handleSubmit = async e => {
    e.preventDefault();
    const blog = { title, feeling, reflection, date: new Date()}

    setLoading(true);

    await projectFirestore.collection('users').doc(uid).collection('journalEntries').add(blog);

    setLoading(false);
    history.push('/entries')
  }

  return (  
    <>
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
    </>
  );
}

export default SimpleEntry;