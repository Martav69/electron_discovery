const { ipcMain } = require('electron');

const { shell } = require('electron');
const { exec } = require("child_process");
const { stdout, stderr } = require('process');

// on déclare le renderer
const ipc  = require('electron').ipcRenderer

function test() {

    ipc.send('NomDuChannel')

}

function getPass() {

    let myPseudo = "Martav"
    ipc.send('getMyVariable', myPseudo)

}

// ici j'appelle le ipc du back 
ipc.on('MonSecondChannel', (event, pass) => {

    console.log("Le Back M'a Appelé MonSecondChannel")
    console.log("Le Mot de passe est = ", pass)

    let myH2 = document.getElementById('myH2');
    myH2.innerHTML = pass;


})

// ici sa lance une commande terminl
function openLink(url){
    shell.openExternal(url)
}

function commandTerminal(){

    let cmd = 'ls -l';

    exec(cmd, (error, stdout, stderr) => {


        if(error) {
            console.error("Exec error : " , error);
            return;
        }
        console.log('stdout : ', stdout);
        console.log('stderr : ', stderr);
    });

}

