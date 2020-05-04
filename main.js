console.log("working on github");

const electron = require("electron");
const app = electron.app;
const BrowserWindow =  electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain
const dialog = electron.dialog;

let winOne,winTwo,winIpc;

function createWindow(){
    winOne = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });
    winTwo = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
        height: 200,
        width:500,
        frame: false,
        show:false
    });

    winIpc = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    })

    winOne.loadURL(url.format({
        pathname: path.join(__dirname,'one.html'),
        protocol:'file',
        slashes: true
    }));

    winTwo.loadURL(url.format({
        pathname: path.join(__dirname,'QuoteWidget.html'),
        protocol:'file',
        slashes: true
    }));

    winIpc.loadURL(url.format({
        pathname: path.join(__dirname,'ipc.html'),
        protocol:'file',
        slashes: true
    }));

    winOne.webContents.openDevTools();
    // winTwo.webContents.openDevTools();
    winIpc.webContents.openDevTools();

    winOne.on('closed',()=>{
        winOne = null;
    })

    winTwo.on('closed',()=>{
        winTwo = null;
    })

    winIpc.on('closed',()=>{
        winIpc = null;
    })

    winTwo.once('ready-to-show',()=>{
        winTwo.show();
    })

    ipc.on('async-message',function(event){
        event.sender.send('async-reply','Main process opened the error dialog')
    })

    ipc.on('sync-message',function(event){
        event.returnValue = 'sync-reply';
    })
}

app.on('ready',createWindow);

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    if(win== null){
        createWindow();
    }
});