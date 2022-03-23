const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const config = require('./config')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadURL(config.url)
}

function toggleDevTools() {
  win.webContents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('Ctrl+J', toggleDevTools)
}

app.whenReady().then(() => {
  createWindow(), createShortcuts()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
