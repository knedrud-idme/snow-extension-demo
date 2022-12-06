chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('BACKGROUND received message:', request);

  sendResponse({response: "BACKGROUND response"});
});

