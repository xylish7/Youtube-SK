import downloadEventsName from '../../shared/events-name/download-events-names';
import { ipcRenderer } from 'electron';

export const startDownloadEvent = (url: string) => {
  ipcRenderer.send(downloadEventsName.START_DOWNLOAD, url);
};
