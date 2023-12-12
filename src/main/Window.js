import { ipcMain } from 'electron'

// ipcMain.on('set-window-size', (event, arg) => {

// })

export const setRendererContentSize = (mainWindow) => {
  var [width, height] = mainWindow.getSize()
  mainWindow.webContents.executeJavaScript(`document.getElementsByClassName('app-container')[0].style="width:${width - 39}px;height:${height - 55}px"`, true)
  // .then((result) => {
  //   console.log(result) // Will be the JSON object from the fetch call
  // })
}
