// listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('CONTENT received message:', request);

  // handle options message
  if (request.options) {
    setOptions(request.options);
  }

  sendResponse({response: "CONTENT response"});
});

// send message when extension content has been injected into the page
chrome.runtime.sendMessage({
  greeting: "hello from CONTENT",
  url: window.location.href,
}).then(response => {
  console.log('CONTENT received response:', response);
});

// start snowflake animation
start();

// build snowflake overlay and add to page
function start() {
  let snowOverlay = document.createElement('div');
  snowOverlay.setAttribute('id', 'snow-extension-demo-overlay');

  // add 100 snowflakes
  for (let i = 0; i < 100; i++) {
    let snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    let xOffset = Math.random() * 100;
    snowflake.style.setProperty('--x-offset', `${xOffset}vw`);

    let yOffset = Math.random() * 100;
    snowflake.style.setProperty('--y-offset', `-${yOffset}vh`);

    let scale = 1 + Math.random() * 2;
    snowflake.style.setProperty('--scale', scale);

    let rotation = Math.random() * 360;
    let rotationChange = 180 + Math.random() * 180;
    snowflake.style.setProperty('--rotation-start', `${rotation}deg`);
    snowflake.style.setProperty('--rotation-end', `${rotation + rotationChange}deg`);

    let duration = 10 + Math.random() * 10;
    snowflake.style.setProperty('--duration', `${duration}s`);

    snowOverlay.appendChild(snowflake);
  }

  document.querySelector('body').appendChild(snowOverlay);
}

// set options via css custom properties
function setOptions(options) {
  for (const [key, value] of Object.entries(options)) {
    let cssVar = `--option-${key}`;
    document.querySelector('#snow-extension-demo-overlay').style.setProperty(cssVar, value);
  }
}
