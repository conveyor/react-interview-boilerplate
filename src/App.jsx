import { useState } from 'react'
import { useFetch } from 'use-http'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Feel free to use any `fetch` method you'd like. `use-http` is included only because the hook based interface was easy
  // to integrate with the boilerplate code. 
  // 
  // The last argument [] means it will run onMount. If you pass it a variable like [someVariable], it will run onMount and again whenever someVariable changes values
  const { get, post, loading, error, data = '' } = useFetch("https://backend.example.com", {}, []);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
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
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
