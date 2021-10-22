import React from 'react';
import { Card } from 'react-bootstrap';

function Home() {
  return (
    <div className="home">
      <Card>
        <Card.Header as="h5">Welcome to "Know Myself!"</Card.Header>
        <Card.Body>
          <Card.Title>Introduction</Card.Title>
          <Card.Text>
            This is an app to help users better understand themselves, biases, and triggers better. All with the ultimate goal of becoming better people.
          </Card.Text>
          <Card.Text>
            Here, you can keep track of your own reactions to controversial topics.
          </Card.Text>
          <Card.Text>
            There's also access to some lessons (unfinished), but it's a start!
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Home;
