import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { projectFirestore } from '../firebase/config';
import { Carousel } from 'react-bootstrap';

const Create = () => {
  const [title, setTitle] = useState('');
  const [incident, setIncident] = useState('')
  const [feeling, setFeeling] = useState('');
  const [reaction, setReaction] = useState('');
  const [otherside, setOtherside] = useState('');
  const [reflection, setReflection] = useState('');
  const [lessonslearned, setLessonslearned] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const handleSubmit = async e => {
    e.preventDefault();
    const blog = { title, incident, feeling, reaction, otherside, reflection, lessonslearned, date: new Date()}

    setLoading(true);

    await projectFirestore.collection('users').doc(uid).collection('journalEntries').add(blog);

    setLoading(false);
    history.push('/entries')
  }

  return (
    <div className="create">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src='https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="fourth slide"
          />
          <Carousel.Caption>
            <h3>fourth slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br/>
      <h2>Add a New Blog</h2>
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
        { !loading && <button>Add Blog</button>}
        { loading && <button disabled>Adding blog..</button>}
      </form>
    </div>
  )
}

export default Create;
