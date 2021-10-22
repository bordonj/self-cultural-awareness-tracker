import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import firebase from 'firebase/app';
import { Margin } from './Lessons';

function Profile() {
  const [seeProfile, setSeeProfile] = useState(true);
  const [myProfile, setMyProfile] = useState({name: '', age: ''});
  const firestore = useFirestore();
  const uid = localStorage.getItem("uid");

  function addProfileInfo(event) {
    event.preventDefault();
    return firestore.collection('users').doc(uid).set({
      name: event.target.name.value,
      age: event.target.age.value
    });
  }

  const db = firestore.collection('users').doc(uid);
  const getInfo = () => {
    db.get().then(doc => {
      if (doc.exists) {
        console.log('doc data', doc.data())
        const data = doc.data();
        setMyProfile(data);
      } else {
        console.log('no exist')
      }
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getInfo();

  }, []);

  
  console.log('my profile', myProfile)
  return (
    <Margin>
      <div>
        <h1>Name: {myProfile.name}</h1>
        <h3>Age: {myProfile.age}</h3>
        <div className="ui inverted segment">
          <form className="ui inverted form" onSubmit={addProfileInfo}>
            <div className="field">
              <label>Name</label>
              <input
                type='text'
                name='name'
                placeholder='Jane Doe' />
              <label>Age</label>
              <input
                type='text'
                name='age'
                placeholder='21' />
              </div>
              <button className="ui teal button">Go back</button>
            </form>
          </div>
      </div>
    </Margin>
  )
}

export default Profile
