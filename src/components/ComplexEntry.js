import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { projectFirestore } from '../firebase/config';

const ComplexEntry = () => {
  const [title, setTitle] = useState('');
  const [incident, setIncident] = useState('')
  const [feeling, setFeeling] = useState('');
  const [reaction, setReaction] = useState('');
  const [otherside, setOtherside] = useState('');
  const [reflection, setReflection] = useState('');
  const [otherFeeling, setOtherFeeling] = useState(false);
  const [oFeeling, setOFeeling] = useState('');
  const [lessonslearned, setLessonslearned] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  useEffect(() => {
    if (feeling === 'other') {
      setOtherFeeling(true)
    } else {
      setOtherFeeling(false);
      setOFeeling('');
    }
  }, [feeling])

  const handleSubmit = async e => {
    e.preventDefault();
    let blog;
    if (feeling === 'other') {
      blog = { title, incident, feeling: oFeeling, reaction, otherside, reflection, lessonslearned, date: blog.date}
    } else {
      blog = { title, incident, feeling, reaction, otherside, reflection, lessonslearned, date: blog.date}
    }

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
      <label>Feeling: (<a href="https://firebasestorage.googleapis.com/v0/b/know-myself-76d29.appspot.com/o/feelings.png?alt=media&token=2eee0d5f-e9aa-485c-aa67-0f0676dfe5eb" target="_blank">Click for Feelings Wheel</a>)</label>
      <select
        placeholder="Defensive but remorseful"
        value={feeling}
        onChange={e => setFeeling(e.target.value)}
        required>
          <option value='Happy'>Happy</option>
          <option value='Surprised'>Surprised</option>
          <option value='Bad'>Bad</option>
          <option value='Afraid'>Afraid</option>
          <option value='Angry'>Angry</option>
          <option value='Disgusted'>Disgusted</option>
          <option value='Apprehensive'>Apprehensive</option>
          <option value='Peaceful'>Peaceful</option>
          <option value='Frustrated'>Frustrated</option>
          <option value='Resentful'>Resentful</option>
          <option value='other'>Other...</option>
      </select>
      {otherFeeling && (
        <input 
          placeholder="Defensive but remorseful"
          value={oFeeling}
          onChange={e => setOFeeling(e.target.value)}
          required
        />
        )
      }
      <label>Incident:</label>
      <input
        placeholder="Being told that I was out of place with my joke"
        value={incident}
        onChange={e => setIncident(e.target.value)}
      />
      <label>Reaction:</label>
      <input
        placeholder="Initially said the other party was too sensitive"
        value={reaction}
        onChange={e => setReaction(e.target.value)}
      />
      <label>Other perspective:</label>
      <input
        placeholder="Maybe they had their reasons to find it offensive"
        value={otherside}
        onChange={e => setOtherside(e.target.value)}
      />
      <label>Reflection:</label>
      <textarea
        placeholder="I've thought more about how I could be insensitive because I've not as aware and ignorant of others feelings"
        value={reflection}
        onChange={e => setReflection(e.target.value)}
      />
      <label>Lessons learned:</label>
      <input
        placeholder="I could be less dismissive"
        value={lessonslearned}
        onChange={e => setLessonslearned(e.target.value)}
      />
      { !loading && <button>Add Blog</button>}
      { loading && <button disabled>Adding blog..</button>}
    </form>
    </>
  );
}

export default ComplexEntry;