import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import Edit from "./Edit";


const BlogDetails = () => {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams(); 
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const { doc, loading } = useFetch('users', uid, id);
  const history = useHistory();

  const handleDelete = async e => {
    e.preventDefault();
    let response = window.confirm('Are you sure you want to delete this?')
    if (response) {
      await projectFirestore.collection('users').doc(uid).collection('journalEntries').doc(id).delete();
  
      history.push('/entries');
    }

  }


  if (editForm) {
    return (
      <Edit blog={doc}/>
    )
  }
  return (
    <>
      { loading && 
        <div className="spinner-parent">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      }
      { !loading &&
        <Card>
          <div className="blog-details">
            <h1><b>Title:</b> {doc.title}</h1>
            <p><b>Incident:</b> {doc.incident}</p>
            <p><b>Feeling:</b> {doc.feeling}</p>
            <p><b>Reaction:</b> {doc.reaction}</p>
            <p><b>Other side:</b> {doc.otherside}</p>
            <p><b>Reflection:</b> {doc.reflection}</p>
            <p><b>Lessons learned:</b> {doc.lessonslearned}</p>
            <div className="details-links">
              <Link to="/entries">
                <button className="d-link">Back to Entries</button>
              </Link>
              <button className="d-link" onClick={() => setEditForm(true)}>Edit Entry</button>
              <button className="d-link" onClick={handleDelete}>Delete Entry</button>
            </div>
          </div>
        </Card>
      }  
    </>
  );
}

export default BlogDetails;