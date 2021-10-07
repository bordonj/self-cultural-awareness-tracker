import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import firebase from 'firebase/app';
import { Margin } from './Lessons';

function Profile() {
  const [seeProfile, setSeeProfile] = useState(true);
  const [myProfile, setMyProfile] = useState();
  const firestore = useFirestore();
  const uid = localStorage.getItem("uid");
  console.log('uid', uid)
  function addProfileInfo(event) {
    event.preventDefault();
    return firestore.collection('users').doc(uid).set({
      name: event.target.name.value
    });
  }
  
  return (
    <Margin>
      <div>
        <div className="ui inverted segment">
          <form className="ui inverted form" onSubmit={addProfileInfo}>
            <div className="field">
              <label>Name</label>
              <input
                type='text'
                name='name'
                placeholder='Jane Doe' />
              </div>
              <button className="ui teal button">Go back</button>
            </form>
          </div>
      </div>
    </Margin>
  )
}

export default Profile
