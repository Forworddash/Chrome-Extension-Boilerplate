console.log('content.js loaded');
chrome.storage.local.get('mode', (data) => {
    const mode = data.mode || 'none';
    console.log('mode:', mode);
    document.body.classList.remove('dark-mode', 'light-mode');
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (mode === 'light') {
        document.body.classList.add('light-mode');
    }
});