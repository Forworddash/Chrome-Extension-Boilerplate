import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [mode, setMode] = useState('none');
    
  useEffect(() => {
    chrome.storage.local.get('mode', (data) => {
      setMode(data.mode || 'none');
    });
  }, []);
  
  const saveMode = (newMode: string) => {
    chrome.storage.local.set({ mode: newMode });
  };

  const handleModeChange = (newMode: string) => {
    console.log('newMode', newMode);
    setMode(newMode);
    saveMode(newMode); // save the new mode to local storage
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (mode: string) => {
            document.body.classList.remove('dark-mode', 'light-mode');
            if (mode === 'dark') {
              document.body.classList.add('dark-mode');
            } else if (mode === 'light') {
              document.body.classList.add('light-mode');
            }
          },
          args: [newMode],
        });
      }
    });
  
  };

  // useEffect(() => {
  //   // apply the theme when the component mounts
  //   onClick(); // apply the theme when the app loads
  // }, [mode]);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Dark Mode Extension</h1>
      <div className="toggle-switch">
        <label>
          <input
            type="checkbox"
            checked={mode === 'dark'}
            onChange={(e) => handleModeChange(e.target.checked ? 'dark' : 'light')}
          />
          <span className="slider"></span>
        </label>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
