import { useEffect, useState, useRef } from 'react'
import { gql, useMutation } from '@apollo/client';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const signupMutation = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      username
      password
    }
  }
`

function App() {
  const [count, setCount] = useState(0);

  const [signup, { loading, error }] = useMutation(signupMutation);
  
  const isMounted = useRef(false);

  useEffect(() => {
    if(!isMounted.current) {
      
      if (loading) console.log('Submitting...');

      if (error) console.log(`Submission error! ${error.message}`);
      isMounted.current = true;
      signup({ variables: { username: "idk", password: "123"} }).then(() => {
        fetch('http://localhost:5173/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({query: `{ login(username: "idk", password: "123") {username, password,} }`})
        })
        .then(res => res.json())
        .then(res => console.log(res.data));
      });
    };
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
