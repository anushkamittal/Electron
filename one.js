console.log("Renderer 1");

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const butWindowId = document.getElementById('butWindowId');
butWindowId.addEventListener('click',function(event){
    let winThree = new BrowserWindow();

    winThree.loadURL(url.format({
        pathname: path.join(__dirname,'three.html'),
        protocol:'file',
        slashes: true
    }));

    winThree.webContents.openDevTools();

    winThree.on('closed',()=>{
        winThree = null;
    })
});


