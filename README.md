# Snow Extension Demo

This is a demo of a simple browser extension that adds falling snow to the page.

To run the extension in Chrome:
1. Clone or download this repo on your local machine
2. In Chrome, go to the extensions page at `chrome://extensions/`
3. Enable the "Developer mode" switch (top right)
4. Click "Load unpacked" (top left) and select the directory where you saved the extension

## Manifest (`manifest.json`)
- JSON file of extension settings, permissions, what files to run
- Currently on manifest version 3 - many existing extensions (and documentation) use manifest v2, but v2 is being phased out and Chrome will no longer accept new extensions using v2
- More info: https://developer.chrome.com/docs/extensions/mv3/

## Background Service Worker (`background.js`)
- Runs in the background of the browser, not part of any particular window/tab/page
- Does not stop executing when navigating to new page or closing the window/tab
- Can be used to make API requests in the background, save/retrieve data, communicate between different parts of the browser
- Not really needed for this extension, but included to demo passing messages between different parts of the extension
- Specified in `manifest.json`:
```
"background": {
  "service_worker": "background.js"
}
```

## Content Script (`content.js` and `snow.css`)
- Inserted into the page after it loads
- Has access to the `window` object and can interact with the page's DOM
- Specified in `manifest.json`:
```
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"],
    "css": ["assets/css/snow.css"],
    "run_at": "document_end"
  }
]
```

## Popup (`popup.html` and `popup.js`)
- Popup triggered by user action (clicking on the extension icon in the toolbar)
- Cannot display automatically without user action
- Has its own separate DOM
- Specified in `manifest.json`:
```
"action": {
  "default_popup": "popup.html"
}
```
