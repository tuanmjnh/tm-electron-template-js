import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import dialog from './Dialog'
import test from './test'
// import { initializeIpcEvents, releaseIpcEvents } from './IPCEvents'
// import { createMainWindow } from './WindowManager'
// import { createMainMenu } from './MainMenu'
let mainWindow
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
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false, // turn off remote
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: false,
          fullscreenable: false,
          backgroundColor: 'black',
          webPreferences: {
            preload: 'my-child-window-preload-script.js'
          }
        }
      }
    }
    return { action: 'deny' }
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

  // Once dom-ready
  mainWindow.webContents.once('dom-ready', () => {
    // var [width, height] = mainWindow.getSize()
    // console.log(width, height)
    // mainWindow.webContents.send('window-size', { width: width, height: height })
    // setRendererContentSize(mainWindow)
    // mainWindow.webContents.executeJavaScript('console.log("abc")')
    // mainWindow.webContents.executeJavaScript(`document.getElementsByClassName('app-container')[0].style="width:${width - 39}px;height:${height - 55}px"`)
  })
  mainWindow.webContents.once('did-finish-load', () => {
    // var [width, height] = mainWindow.getSize()
    // mainWindow.webContents.send('window-size', { width: width, height: height })
  })
}

const openChildrenWindow = () => {
  const child = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
  child.loadURL('https://github.com')
  child.once('ready-to-show', () => {
    child.show()
  })
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

  createWindow()
  // createMainMenu()
  // initializeIpcEvents()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // resize
  // mainWindow.on('resize', () => {
  // var [width, height] = mainWindow.getSize()
  // mainWindow.webContents.executeJavaScript(`document.getElementsByClassName('app-container')[0].style="width:${width - 39}px;height:${height - 55}px"`, true)
  // })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // releaseIpcEvents()
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
