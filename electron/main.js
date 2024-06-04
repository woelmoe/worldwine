const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const {exec} = require("node:child_process");

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL('http://127.0.0.1:8000/')
}

app.whenReady().then(async () => {
    const execPath = path.join(__dirname, '../')
    const command = `cd ${execPath} && python manage.py runserver`
    const proc = exec(command, { windowsHide: true })

    proc.stdout?.on('data', (data) => {
        console.log('stdout')
        console.log(data)
    })

    proc.stderr?.on('data', (data) => {
        console.log('stderr')
        createWindow()
        console.log(data)
    })

    proc.on('error', (error) => {
        console.log('error')
        console.log(data)
    })

    proc.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
