import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import PicProgressBar from "./PicProgressBar";

const UpdateProfile = ({ setEditProfile, profile }) => {
  console.log('profile update', profile)
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const { uid } = currentUser;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // hooks for demographics
  const [age, setAge] = useState(profile.age ? profile.age : '');
  const [name, setName] = useState(profile.name ? profile.name : '');
  const [profilePic, setProfilePic] = useState(profile.profilePic ? profile.profilePic : 'https://firebasestorage.googleapis.com/v0/b/know-myself-76d29.appspot.com/o/anon.jpg?alt=media&token=da271531-5d56-41cf-8719-fce913be9803');
  const [picErr, setPicErr] = useState('');
  const [picFile, setPicFile] = useState(null);
  console.log('pic file', picFile);

  const picChangeHandler = e => {
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setPicFile(selected);
      setPicErr('');
    } else {
      setProfilePic(null);
      setPicErr('Please select an image file.')
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    const profile = { name, age, profilePic };
    promises.push(projectFirestore.collection('users').doc(uid).set(profile));

    Promise.all(promises).then(() => {
    }).catch(err => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
      setEditProfile(false)
      history.push('/profile');
    })
  }

  return (  
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <img src={profilePic} style={{width: '200px'}}/>
            <Form.Group id="pic">
              <label>
                <input type="file" onChange={picChangeHandler}/>
                <label>{picErr}</label>
              </label>
              { picFile && <PicProgressBar picFile={picFile} setPicFile={setPicFile} setProfilePic={setProfilePic}/>}
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group id="age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <button onClick={() => setEditProfile(false)}>Cancel</button>
      </div>
    </>
  );
}

export default UpdateProfile;

