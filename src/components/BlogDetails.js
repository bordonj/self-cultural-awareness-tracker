import { useState } from "react";
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
  console.log('doc', doc)
  console.log('loading blog', loading)

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
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      { !loading &&
        <Card>
          <div className="blog-details">
            <h1>Title: {doc.title}</h1>
            <p>incident: {doc.incident}</p>
            <p>feeling: {doc.feeling}</p>
            <p>reaction: {doc.reaction}</p>
            <p>other side: {doc.otherside}</p>
            <p>Title: {doc.title}</p>
            <p>reflection: {doc.reflection}</p>
            <p>lessons learned: {doc.lessonslearned}</p>
            <Link to="/entries">
              <button className="ui button grey">back to journals</button>
            </Link>
            <button onClick={() => setEditForm(true)}>Edit Entry</button>
          </div>
        </Card>
      }  
    </>
  );
}

export default BlogDetails;