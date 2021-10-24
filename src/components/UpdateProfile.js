import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import PicProgressBar from "./PicProgressBar";

const UpdateProfile = ({ setEditProfile, profile }) => {
  // console.log('profile update', profile)
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const { uid } = currentUser;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // hooks for demographics
  const [profilePic, setProfilePic] = useState(profile?.profilePic ? profile.profilePic : 'https://firebasestorage.googleapis.com/v0/b/know-myself-76d29.appspot.com/o/anon.jpg?alt=media&token=da271531-5d56-41cf-8719-fce913be9803');
  const [picErr, setPicErr] = useState('');
  const [picFile, setPicFile] = useState(null); 
  // end photo
  const [age, setAge] = useState(profile?.age ? profile.age : '');
  const [name, setName] = useState(profile?.name ? profile.name : '');
  const [race, setRace] = useState(profile?.race ? profile.race : '');
  const [ethnicity, setEthnicity] = useState(profile?.ethnicity ? profile.ethnicity : '');
  const [gender, setGender] = useState(profile?.gender ? profile.gender : '');
  const [sexuality, setSexuality] = useState(profile?.sexuality ? profile.sexuality : '');
  const [ability, setAbility] = useState(profile?.ability ? profile.ability : '');
  const [language, setLanguage] = useState(profile?.language ? profile.language : '');
  const [occupation, setOccupation] = useState(profile?.occupation ? profile.occupation : '');
  const [religion, setReligion] = useState(profile?.religion ? profile.religion : '');
  const [nationality, setNationality] = useState(profile?.nationality ? profile.nationality : '');
  const [immstatus, setImmstatus] = useState(profile?.immstatus ? profile.immstatus : '');
  

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

    const profile = { profilePic, name, age, race, ethnicity, gender, sexuality, ability, language, occupation, religion, nationality, immstatus };
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
            <br/>
            <h2 style={{textAlign: 'center'}}>Demographics</h2>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group id="age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group id="race">
              <Form.Label>Race</Form.Label>
              <Form.Control type="text" value={race} onChange={(e) => setRace(e.target.value)} />
            </Form.Group>
            <Form.Group id="ethnicity">
              <Form.Label>Ethnicity</Form.Label>
              <Form.Control type="text" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} />
            </Form.Group>
            <Form.Group id="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </Form.Group>
            <Form.Group id="sexuality">
              <Form.Label>Sexuality</Form.Label>
              <Form.Control type="text" value={sexuality} onChange={(e) => setSexuality(e.target.value)} />
            </Form.Group>
            <Form.Group id="ability">
              <Form.Label>Ability</Form.Label>
              <Form.Control type="text" value={ability} onChange={(e) => setAbility(e.target.value)} />
            </Form.Group>
            <Form.Group id="language">
              <Form.Label>Language(s)</Form.Label>
              <Form.Control type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
            </Form.Group>
            <Form.Group id="occupation">
              <Form.Label>Occupation</Form.Label>
              <Form.Control type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </Form.Group>
            <Form.Group id="religion">
              <Form.Label>Religion</Form.Label>
              <Form.Control type="text" value={religion} onChange={(e) => setReligion(e.target.value)} />
            </Form.Group>
            <Form.Group id="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </Form.Group>
            <Form.Group id="immstatus">
              <Form.Label>Immigrant Status</Form.Label>
              <Form.Control type="text" value={immstatus} onChange={(e) => setImmstatus(e.target.value)} />
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

