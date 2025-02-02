import { useState, useEffect } from 'react';
import './App.css';

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
    console.log('New mode:', newMode); // Debugging
    setMode(newMode);
    saveMode(newMode);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (mode: string) => {
            console.log('Applying mode:', mode); // Debugging
            document.body.classList.remove('dark-mode', 'light-mode');
            if (mode === 'dark') {
              document.body.style.backgroundColor = '#121212';
              document.body.style.color = '#ffffff';
              document.body.classList.add('dark-mode');
            } else if (mode === 'light') {
              document.body.style.backgroundColor = '#ffffff';
              document.body.style.color = '#000000';
              document.body.classList.add('light-mode');
            }
          },
          args: [newMode],
        });
      }
    });
  };

  return (
    <>
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
    </>
  );
}

export default App;