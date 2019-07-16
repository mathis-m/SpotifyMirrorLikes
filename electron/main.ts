import {app, BrowserWindow, protocol} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

// Base path used to resolve modules
const base = app.getAppPath();

// Protocol will be "app://./…"
const scheme = 'app';

protocol.registerSchemesAsPrivileged([{scheme, privileges: {secure: true}}]);
require('./create-protocol')(scheme, base);

const indexHtml = path.join(__dirname, '../../dist/SpotifyMirrorLikes/index.html');
const content = fs.readFileSync(indexHtml, {encoding: 'utf8'});
fs.writeFileSync(indexHtml, content.replace(/src="/g, 'src="app:'));

let win: BrowserWindow;

// @ts-ignore
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false
        }
    });
    win.loadURL(
        url.format({
            pathname: `index.html`,
            protocol: 'app',
            slashes: true
        })
    );

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
