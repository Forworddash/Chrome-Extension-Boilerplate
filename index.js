async function sayHello() {
    let [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tabs.id },
        func: () => {
            alert('Hello, from my extension!');
        },
    });
}
document.getElementById('myButton').addEventListener('click', sayHello); 