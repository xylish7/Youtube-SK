require('hazardous');
import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { EDownloadEventsName } from '../shared/events-name/download-events-names';
import DownloadService from './services/DownloadService';
import AppUpdater from './services/AppUpdater';

let win: BrowserWindow | null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, 'assets/youtube-sk.ico')
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', () => {
  // Create main window
  createWindow();

  ipcMain.on(EDownloadEventsName.START_DOWNLOAD, (event: IpcMessageEvent, downloadUrl: string) => {
    const downloadService = new DownloadService(event);
    downloadService.download(downloadUrl);
  });

  ipcMain.on(EDownloadEventsName.CHECk_FOR_UPDATES, (event: IpcMessageEvent) => {
    const downloadService = new DownloadService(event);
    downloadService.checkForUpdates();
  });

  // Check for updates
  new AppUpdater();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
