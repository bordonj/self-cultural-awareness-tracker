import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";


const BlogDetails = () => {
  const { id } = useParams(); 
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const { doc, loading } = useFetch('users', uid, id);
  console.log('doc', doc)
  console.log('loading blog', loading)

  return (
    <>
      { loading && 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
          </div>
        </Card>
      }  
    </>
  );
}

export default BlogDetails;