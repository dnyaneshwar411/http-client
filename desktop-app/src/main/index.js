import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { sendRequestAtURL } from '../services/request-builder'
import { fromServer, toServer } from '../services/api'
import { authenticateWeb, createUserSession, openURLSteps, userLoggedIn } from '../services/authentication'
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

protocol.registerSchemesAsPrivileged([{
  scheme: 'xhttpclient',
  privileges: {
    standard: false,
    secure: false
  }
}]);

export let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.setAsDefaultProtocolClient("xhttpclient");

  app.on('open-url', (event, url) => {
    event.preventDefault();
    openURLSteps(url)
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle("send-request", async (event, config) => {
  return sendRequestAtURL(config);
});

ipcMain.handle("server-request-fetch", async (event, path, config) => {
  return fromServer(path, config);
})

ipcMain.handle("server-request-send", async (event, path, config) => {
  return toServer(path, config);
})

ipcMain.handle("server-session", async () => {
  return userLoggedIn();
})

ipcMain.handle("authenticate-web", async () => {
  return authenticateWeb();
})

ipcMain.handle("open-external-url", async (event, url) => {
  shell.openExternal(url);
})

ipcMain.handle("create-user-session", async (_, code) => {
  return await createUserSession(code)
})


/**
 * Following are the end vars
 */