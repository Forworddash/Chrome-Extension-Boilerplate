import reactLogo from './assets/react.svg'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode ? JSON.parse(savedMode) : 'none'; // default mode is none, no mode selected
  });
  
  const saveMode = (newMode: string) => {
    localStorage.setItem('mode', JSON.stringify(newMode));
  };

  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: {tabId: tab.id!},
      func: (mode: string) => {
        if (mode === 'dark') {
          document.body.style.backgroundColor = "#121212"; // Dark background color
          document.body.style.color = "#ffffff"; // Light text color
        } else if (mode === 'light') {
          document.body.style.backgroundColor = "#ffffff"; // Light background color
          document.body.style.color = "#000000"; // Dark text color
        } else {
          document.body.style.backgroundColor = ""; // Default background color
          document.body.style.color = ""; // Default text color
        }
      },
      args: [mode],
    });
    saveMode(mode);
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    saveMode(newMode); // save the new mode to local storage
  };

  useEffect(() => {
    // apply the theme when the component mounts
    onClick(); // apply the theme when the app loads
  }, [mode]);

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
            type="radio"
            name="mode"
            checked={mode === 'dark'}
            onChange={() => handleModeChange('dark')}
          />
          Dark Mode
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === 'light'}
            onChange={() => handleModeChange('light')}
          />
          Light Mode
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === 'none'}
            onChange={() => handleModeChange('none')}
          />
          No Mode (Default)
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
