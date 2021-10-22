import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import useFirestore from '../hooks/useFirestore'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const BlogList = () => {
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const { docs: blogs, loading } = useFirestore('users', uid);
  console.log(blogs);
  console.log('loading', loading);



  return (
    <div className="blog-list">
      <h1>Blog Entries</h1>
      { blogs.length === 0 && !loading && <h3>None created yet... get started with a <Link to="/create">new blog!</Link></h3>}
      { loading &&
        <div className="spinner-parent"> 
          <Spinner animation="border" role="status" id="spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      {blogs.map(blog => {
        return (
          <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <p><strong>Date:</strong> { new Date(blog.date.seconds * 1000).toString() }</p>
              <h2><strong>Title</strong>: { blog.title }</h2>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList
