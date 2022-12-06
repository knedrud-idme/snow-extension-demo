// listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('POPUP received message:', request);
  sendResponse({response: "POPUP response"});
});

// send a message when popup is opened via user action (clicking extension icon)
chrome.runtime.sendMessage({
  greeting: "hello from POPUP",
  document: document,
}).then(response => {
  console.log('POPUP received response:', response);
});

// listen for popup.html DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
  // listen for input changes
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', event => {
      console.log('change', event.currentTarget.id, event.currentTarget.value);
      updateOption(event.currentTarget.id, event.currentTarget.value);
    });
  });
});

// get active tab of current window
// returns a promise
function getCurrentTab() {
  return chrome.windows.getCurrent({
    populate: true,
  }).then((window) => {
    // get active tab from the current window that initiated the popup
    return window.tabs.find(tab => tab.active);
  });
}

// send message to tab with option key/value to update
function updateOption(key, value) {
  let options = {};
  options[key] = value;
  getCurrentTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, { options: options })
  });
}
