import reactLogo from './assets/react.svg'
import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ colour, setColour ] = useState('red');
  
  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript<string[], void>({
      target: {tabId: tab.id!},
      args: [colour],
      func: (colour) => {
        document.body.style.backgroundColor = colour;
      }
    });
  }
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
      <h1>My Extension</h1>
      <div className="card">
        <input type="color" onChange={(e) => setColour(e.currentTarget.value)} value={colour} />
        <button onClick={() => onClick()}>
          Click Me
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
