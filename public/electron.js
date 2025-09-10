// public/electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // if you use a preload script, copy it to public/build packaging as well
      // preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  // In the packaged app CRA's index.html will be next to this file
  // In development, you can set ELECTRON_START_URL to http://localhost:3000
  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
  } else {
    // When packaged, this will load build/index.html
    win.loadFile(path.join(__dirname, 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
