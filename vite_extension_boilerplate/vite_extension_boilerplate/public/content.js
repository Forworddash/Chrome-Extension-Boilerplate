chrome.storage.local.get('mode', (data) => {
    const mode = data.mode || 'none';
    document.body.classList.remove('dark-mode', 'light-mode');
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#121212'; // Override inline styles
      document.body.style.color = '#ffffff'; // Override inline styles
      document.body.classList.add('dark-mode');
    } else if (mode === 'light') {
      document.body.style.backgroundColor = '#ffffff'; // Override inline styles
      document.body.style.color = '#000000'; // Override inline styles
      document.body.classList.add('light-mode');
    }
  });