import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { projectFirestore } from '../firebase/config';

const EditComplexEntry = ({ blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [incident, setIncident] = useState(blog.incident)
  const [feeling, setFeeling] = useState(blog.feeling);
  const [reaction, setReaction] = useState(blog.reaction);
  const [otherside, setOtherside] = useState(blog.otherside);
  const [reflection, setReflection] = useState(blog.reflection);
  const [otherFeeling, setOtherFeeling] = useState(false);
  const [oFeeling, setOFeeling] = useState('');
  const [lessonslearned, setLessonslearned] = useState(blog.lessonslearned);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const { id } = useParams(); 

  const feelingsArr = [
    'Happy',
    'Surprised',
    'Bad',
    'Afraid',
    'Angry',
    'Disgusted',
    'Apprehensive',
    'Peaceful',
    'Frustrated',
    'Resentful',
  ]

  useEffect(() => {
    if (blog.feeling === 'other' || !feelingsArr.includes(feeling)) {
      setOtherFeeling(true)
      setFeeling('other');
      setOFeeling(blog.feeling)
    } else {
      setOtherFeeling(false);
      setOFeeling('');
    }
  }, [feeling, blog.feeling])

  const handleSubmit = async e => {
    e.preventDefault();
    let newBlog;
    if (feeling === 'other') {
      newBlog = { title, incident, feeling: oFeeling, reaction, otherside, reflection, lessonslearned, date: blog.date}
    } else {
      newBlog = { title, incident, feeling, reaction, otherside, reflection, lessonslearned, date: blog.date}
    }
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
          <label>Feeling: (<a href="https://firebasestorage.googleapis.com/v0/b/know-myself-76d29.appspot.com/o/feelings.png?alt=media&token=2eee0d5f-e9aa-485c-aa67-0f0676dfe5eb" target="_blank" rel="noreferrer">Click for Feelings Wheel</a>)</label>
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
            required
            placeholder="Being told that I was out of place with my joke"
            value={incident}
            onChange={e => setIncident(e.target.value)}
          />
          <label>Reaction:</label>
          <input
            required
            placeholder="Initially said the other party was too sensitive"
            value={reaction}
            onChange={e => setReaction(e.target.value)}
          />
          <label>Other perspective:</label>
          <input
            required
            placeholder="Maybe they had their reasons to find it offensive"
            value={otherside}
            onChange={e => setOtherside(e.target.value)}
          />
          <label>Reflection:</label>
          <textarea
            required
            placeholder="I've thought more about how I could be insensitive because I've not as aware and ignorant of others feelings"
            value={reflection}
            onChange={e => setReflection(e.target.value)}
          />
          <label>Lessons learned:</label>
          <input
            required
            placeholder="I could be less dismissive"
            value={lessonslearned}
            onChange={e => setLessonslearned(e.target.value)}
          />
          { !loading && <button>Update Blog</button>}
          { loading && <button disabled>Updating blog..</button>}
        </form>
      </div>
    </>
  )
}

export default EditComplexEntry;
