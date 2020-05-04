const electron = require('electron');
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById("asyncBtn");
const syncBtn = document.getElementById("syncBtn");

asyncBtn.addEventListener('click',()=>{
    console.log('async err msg 1');
    ipc.send('async-message');
    console.log('async err msg 2');
})

syncBtn.addEventListener('click',()=>{
    console.log('sync err msg 1');
    const rep = ipc.sendSync('sync-message');
    console.log(rep);
    console.log('sync err msg 2');
})

ipc.on('async-reply',function(event,arg){
    console.log(arg);
})