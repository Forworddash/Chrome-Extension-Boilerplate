function applyMode(mode) {
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
  }
  
  // Apply the initial mode
  chrome.storage.local.get('mode', (data) => {
    const mode = data.mode || 'none';
    applyMode(mode);
  });
  
  // Watch for DOM changes and reapply the mode
  const observer = new MutationObserver(() => {
    chrome.storage.local.get('mode', (data) => {
      const mode = data.mode || 'none';
      applyMode(mode);
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

