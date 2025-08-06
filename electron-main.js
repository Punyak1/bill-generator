const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      devTools: false // disable for production
    }
  });

  // Load the Angular app's index.html after build
  const indexPath = path.join(__dirname, 'dist', 'bill-generator','browser', 'index.html');

  if (fs.existsSync(indexPath)) {
    win.loadFile(indexPath);
  } else {
    win.loadURL('data:text/html,<h2>No build found</h2><p>Run `ng build` first.</p>');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});