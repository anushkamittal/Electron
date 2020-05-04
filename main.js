console.log("working on github");

const electron = require("electron");
const app = electron.app;
const BrowserWindow =  electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain
const Menu = electron.Menu

let winOne,winQuote,winIpc;

function createWindow(){
    winOne = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });
    winQuote = new BrowserWindow({
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

    winQuote.loadURL(url.format({
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
    // winQuote.webContents.openDevTools();
    winIpc.webContents.openDevTools();

    winOne.on('closed',()=>{
        winOne = null;
    })

    winQuote.on('closed',()=>{
        winQuote = null;
    })

    winIpc.on('closed',()=>{
        winIpc = null;
    })

    winQuote.once('ready-to-show',()=>{
        winQuote.show();
    })

    ipc.on('async-message',function(event){
        event.sender.send('async-reply','Main process opened the error dialog')
    })

    ipc.on('sync-message',function(event){
        event.returnValue = 'sync-reply';
    })
}

app.on('ready',function(){
    createWindow();
    const template = [
        {
            label:'Edit',
            submenu:[
                { role: 'undo'},
                { role: 'redo'},
                { type: 'separator'},
                { role: 'cut'},
                { role: 'copy'},
                { role: 'paste'},
                { role: 'selectall'},
            ]
        },
        {
            label:'Demo',
            submenu:[
                {
                    label:'submenu1',
                    click:function(){
                        console.log("Submenu 1");
                    }
                },
                {
                    type:'separator'
                },
                {
                    label:'submenu2'
                }
            ]
        },
        {
            label:'Help',
            click:function(){
                electron.shell.openExternal('http://electron.atom.io');
            }
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

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