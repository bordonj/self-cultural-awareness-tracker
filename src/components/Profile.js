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
  const us = 'Unspecified';
  console.log('doc', doc)

  const showProfile = () => {
    if (doc) {
      return (
        <Card>
        <Card.Header as="h5">Profile Info</Card.Header>
        <img src={doc.profilePic ? doc.profilePic : 'https://firebasestorage.googleapis.com/v0/b/know-myself-76d29.appspot.com/o/anon.jpg?alt=media&token=da271531-5d56-41cf-8719-fce913be9803'} alt="personal photo" style={{width: '300px', margin: '10px auto', border: '1px solid #ddd', borderRadius: '8px'}}/>
        <Card.Body>
          <Card.Title><h3>Intersectional Identities</h3></Card.Title>
          <hr />
          <Card.Text>
            <b>Name: </b> { doc.name ? doc.name : us }
          </Card.Text>
          <Card.Text>
            <b>Age: </b> { doc.age ? doc.age : us }
          </Card.Text>
          <Card.Text>
            <b>Race: </b> { doc.race ? doc.race : us }
          </Card.Text>
          <Card.Text>
            <b>Ethnicity: </b> { doc.ethnicity ? doc.ethnicity : us }
          </Card.Text>
          <Card.Text>
            <b>Gender: </b> { doc.gender ? doc.gender : us }
          </Card.Text>
          <Card.Text>
            <b>Sexuality: </b> { doc.sexuality ? doc.sexuality : us }
          </Card.Text>
          <Card.Text>
            <b>Ability: </b> { doc.ability ? doc.ability : us }
          </Card.Text>
          <Card.Text>
            <b>Language: </b> { doc.language ? doc.language : us }
          </Card.Text>
          <Card.Text>
            <b>Occupation: </b> { doc.occupation ? doc.occupation : us }
          </Card.Text>
          <Card.Text>
            <b>Religion: </b> { doc.religion ? doc.religion : us }
          </Card.Text>
          <Card.Text>
            <b>Nationality: </b> { doc.nationality ? doc.nationality : us }
          </Card.Text>
          <Card.Text>
            <b>Immigrant Status: </b> { doc.immstatus ? doc.immstatus : us }
          </Card.Text>
          <Button onClick={() => setEditProfile(true)}>Update Profile</Button>
        </Card.Body>
      </Card>
      )
    } else {
      return (
        <>
        <h1>No Profile yet</h1>
        <Button onClick={() => setEditProfile(true)}>Update Profile</Button>
        </>
      )
    }
  }

  // console.log('profile', doc, doc.age, doc.name, pending, uid)
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
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      }
      {showProfile()}
    </>
  );
}

export default Profile;

