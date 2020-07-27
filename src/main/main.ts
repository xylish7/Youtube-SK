require('hazardous');
import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { EDownloadEventsName } from '../shared/events-name/download-events-names';
import DownloadService from './services/DownloadService';
import AppUpdater from './services/AppUpdater';
import { IStartDownloadEParams } from '../renderer/events/download-events';

let win: BrowserWindow | null;

app.allowRendererProcessReuse = true;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
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
    icon: path.join(__dirname, 'assets/youtube-sk.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
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

  // Event which listen when user starts a download
  ipcMain.on(
    EDownloadEventsName.START_DOWNLOAD,
    (
      event: IpcMainEvent,
      options: {
        url: string;
        startDownloadEParams: IStartDownloadEParams;
      }
    ) => {
      const downloadService = new DownloadService(event, options.startDownloadEParams);
      const url = DownloadService.transformPlaylistUrl(options.url);

      if (options.startDownloadEParams.downloadType === 'video') {
        downloadService.startDownload(url);

        ipcMain.on(EDownloadEventsName.STOP_DOWNLOAD, () => {
          downloadService.stopDownload();
        });
      }
    }
  );

  // Event which triggers the update checks for yt-dl.exe
  ipcMain.on(EDownloadEventsName.CHECK_FOR_UPDATES, (event: IpcMainEvent) => {
    // DownloadService.checkForUpdates(event);
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
