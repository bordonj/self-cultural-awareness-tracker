## "Know Myself" - a self and cultural awareness tracker
#### _by Jennifer Bordon_

## Demo Use 

If you would like to try it out yourself, please feel free to use the credentials below to log in.

<a href="https://know-myself-test.web.app/">Live Site</a>
- Username: test@test.com
- Password: password
## Description
This is an application used for the goal of helping users understand themselves, their biases, their triggers, and more better. Hopefully to become more understanding/empathic people. 

Ultimately, someone could hope to become more self-reflective and aware of the choices they make and the consequences they will have. 

User stories:
- access to CRUD functionality for blogs
- profile for demographics, or other intersectional identities
  - can upload a profile photo
- lessons that provide information about multicultural topics
### Technologies used
- JavaScript
- React JS:
  - React Hooks, functional components
- CSS
- MUI (Material UI)
- Bootstrap/react-bootstrap
- React Router
- NPM/webpack/ESLint
- Firebase (BaaS):
  - Firestore Database
  - Authentication
  - Firestore Storage

## Setup/Installation Requirements
### Project Setup
1. Clone the repo in a location you can easily find
2. Open the repo in Visual Studio Code
3. run `npm i` to install the dependencies in the terminal 
### Database
1. Use your google account to access the Firebase at `https://firebase.google.com/`
2. Press `+ Add project` to create a new project 
3. Create a new `Web App` by click the `</>` button
4. Should have access to the Firebase configuration, and store that informatiion in a `.env.local` file in your cloned repo 
### Authentication
1. On the `Build` tab for the Firebase dashboard, press `Authentication`
2. Make sure you `get started` on this enable Authentication
3. Allow `Email/Password` as a sign-in method
### Run Application
1. After completing the above steps, run `npm start` in the terminal for the cloned repo
2. Open your browser to `http://localhost:3000/`

## Bugs
None known at the moment. Please contact me for any discovered bugs.
## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

_Copyright (c) 2021 Jennifer Bordon_
