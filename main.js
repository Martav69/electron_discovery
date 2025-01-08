const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// ce qui te permet de communiquer avec les fichier
const fs = require('fs');

// ici on crée la variable qui stockera la fenêtre principale ( ce sera un objet )
let mainWindow;

function createWindow(){
    
    mainWindow = new BrowserWindow ({
        // frame c'est la barre en haut du système d'exploitation (avec bouton fermer reduire agrandir)
        frame: true,
        //Titre de la fenêtre
        title: "MV App",
        //Taille de la fenêtre
        width: 1318,
        height: 710,
        //Pour resize
        resizable: true,
        //Pour bloquer le resize
        minWidth: 577,
        minHeight: 609,
        // icon 
        icon: path.join(__dirname, 'assets/logo_cineo.png'),
        
        //Les parametres du navigateur de la fenetre en question
        webPreferences: {
            // c'est un fichier js front qui va s'executer tout le temps
            preload: path.join(__dirname, 'front/preload.js'),

            webSecurity: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }

    })

    // met le sous menu par défaut du navigateur ( exemple reload, revenir en arrière etc )
    mainWindow.setMenuBarVisibility(true);

    // ici on peut charger une URL 
    // mainWindow.loadURL('https://google.com');

    // ici pour charger son fichier 
        mainWindow.loadFile('front/main.html')


}


// quand electron est en capacité de se lancer
app.whenReady().then(() => {

    createWindow();

})


//Pour communiqué avec le front vers le back ( une espece de fonction qui s'appelle channel)

ipcMain.on('NomDuChannel', (event) => {

    console.log('Bonjour je suis du Back')

});

// Pour communiqué du back vers le front 
let myPass = "JeSuisUnPass";

ipcMain.on('getMyVariable', (event, pseudo) => {

    // ici on travail pour renvoyer la variable dans le front
    console.log("Demande prise en compte de " + pseudo)
    // on commence par envoyer un autre channel
    event.sender.send('MonSecondChannel', myPass);

    //on log la route de AppData du mac pour trouver le fichier
    console.log(path.join(app.getPath('appData')));


    if (!fs.existsSync(path.join(app.getPath('appData') + '/.myFirstApp'))){
        // crée le dossier
        fs.mkdir(path.join(app.getPath('appData') + '/.myFirstApp'), (err) => {
            if(err) throw err
        })

    }

    // l'écrire dans un fichier 
    /*$$$$
    let url = path.join('/Users/martav/' + 'path.txt');
    */
    // pour l'appeler dans le "appData" fait tout seul par le systeme d'exploitation
    let url = path.join(app.getPath("appData") + "/.myFirstApp/pass.txt")
    let content = myPass;

    fs.appendFile(url, content, (err) => {
        if (err) throw err
    });

    //pour lire le fichier
    fs.readFile(path.join(app.getPath('appData') + '/.myFirstApp/pass.txt'), 'utf8', (err, data) => {
        if(err) throw err;
        console.log("Données du fichier : " + data )
    })


})
