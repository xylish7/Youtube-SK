import { EDownloadEventsName } from '../../shared/events-name/download-events-names';
import { ipcRenderer } from 'electron';

export const startDownloadEvent = (url: string) => {
  ipcRenderer.send(EDownloadEventsName.START_DOWNLOAD, url);
};

export const checkYtdlForUpdatesEvent = () => {
  ipcRenderer.send(EDownloadEventsName.CHECk_FOR_UPDATES);
};
