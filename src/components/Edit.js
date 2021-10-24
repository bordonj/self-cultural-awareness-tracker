import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { projectFirestore } from '../firebase/config';

const Edit = ({ blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [incident, setIncident] = useState(blog.incident)
  const [feeling, setFeeling] = useState(blog.feeling);
  const [reaction, setReaction] = useState(blog.reaction);
  const [otherside, setOtherside] = useState(blog.otherside);
  const [reflection, setReflection] = useState(blog.reflection);
  const [lessonslearned, setLessonslearned] = useState(blog.lessonslearned);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const { id } = useParams(); 

  const handleSubmit = async e => {
    e.preventDefault();
    const newBlog = { title, incident, feeling, reaction, otherside, reflection, lessonslearned, date: blog.date}

    setLoading(true);

    await projectFirestore.collection('users').doc(uid).collection('journalEntries').doc(id).set(newBlog);

    setLoading(false);
    history.push('/entries');
  }

  return (
    <>
      <button id="back" onClick={() => history.push('/entries')}>back to entries</button>
      <div className="create">
        <h2>Update Blog</h2>
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
          { !loading && <button>Edit Blog</button>}
          { loading && <button disabled>Adding blog..</button>}
        </form>
      </div>
    </>
  )
}

export default Edit;
