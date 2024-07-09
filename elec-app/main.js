//main process
const {app, BrowserWindow, Notification } = require('electron')

const path = require('node:path')

function createWindow(){
    // Browser Window <- Renderer process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // whether to use node modules in webbrowser (javascript) or not
            worldSafeExecuteJavascript: true, // default - will sanitize javascript code
            contextIsolation: true, // default - ensure your preload javascripts & electron scripts run in separate contexts
        }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
    const notif = new Notification({title: 'Hello World', body: 'hello world test'}) // Notification is native module of OS
    notif.show()
    const oFile = path.win32.parse('c:\\temp\\tmp.txt') // path is nodeJS object
    console.log(oFile)
})
app.on('window-all-closed', () => { // when someone clicks close button on electro app browser
    if(process.platform != 'darwin'){
        app.quit()
    }
})

app.on('activate', () => { // when someone clicks on window icon of electron app
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})