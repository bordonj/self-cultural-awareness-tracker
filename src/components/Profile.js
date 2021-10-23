import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
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

  console.log('profile', doc, pending, uid)
  if (editProfile) {
    return (
      <UpdateProfile setEditProfile={setEditProfile} />
    )
  }
  return (  
    <>
      <img src="https://firebasestorage.googleapis.com/v0/b/know-myself-76d29.appspot.com/o/anon.jpg?alt=media&token=da271531-5d56-41cf-8719-fce913be9803" alt="personal photo" />
      <h2>{doc.age}</h2>
      <h2>{doc.name}</h2>
      <button onClick={() => setEditProfile(true)}>Update Profile</button>
    </>
  );
}

export default Profile;

