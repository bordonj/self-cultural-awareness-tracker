import { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import useFetchProfile from "../hooks/useFetchProfile";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const { doc, pending } = useFetchProfile('users', uid);
  const [editProfile, setEditProfile] = useState(false);
  const history = useHistory();

  console.log('profile', doc, doc.age, doc.name, pending, uid)
  if (editProfile) {
    return (
      <UpdateProfile profile={doc} setEditProfile={setEditProfile} />
    )
  }
  return (  
    <>
      { pending &&
        <div className="spinner-parent"> 
          <Spinner animation="border" role="status" id="spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      <img src={doc.profilePic} alt="personal photo" style={{width: '300px'}}/>
      <h2>Age: {doc.age}</h2>
      <h2>Name: {doc.name}</h2>
      <button onClick={() => setEditProfile(true)}>Update Profile</button>
    </>
  );
}

export default Profile;

