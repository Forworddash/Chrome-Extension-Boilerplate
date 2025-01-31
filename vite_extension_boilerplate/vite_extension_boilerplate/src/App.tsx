import reactLogo from './assets/react.svg'
import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: {tabId: tab.id!},
      func: (iSDarkMode) => {
        if (iSDarkMode) {
          document.body.style.backgroundColor = "#121212"; // Dark background color
          document.body.style.color = "#ffffff"; // Light text color
        } else {
          document.body.style.backgroundColor = "#ffffff"; // Light background color
          document.body.style.color = "#000000"; // Dark text color
        }
      },
      args: [isDarkMode],
    });
  };

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
      <h1>Dark Mode Extension</h1>
      <div className="card">
        <label>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(prev => !prev)}
          />
          Dark Mode
        </label>
        <button onClick={onClick}>
          Apply
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
