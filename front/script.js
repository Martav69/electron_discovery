const { ipcMain } = require('electron')

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

