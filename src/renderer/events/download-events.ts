import {
  IFileInfo,
  EDownloadEventsName,
  IFileProgress,
  IDownloadInfo
} from '../../shared/events-name/download-events-names';
import { ipcRenderer, IpcMessageEvent } from 'electron';
import { EDownloadStatus } from '../reducers/downloadReducer';

import systemNotifications from '../notifications/system-notifications';
import inAppNotifications from '../notifications/in-app-notifications';
import messages from '../notifications/messages';

/**
 * Event: emited when the download starts
 * @param url
 */
export const startDownloadEvent = (url: string) => {
  ipcRenderer.send(EDownloadEventsName.START_DOWNLOAD, url);
};

/**
 * Event: emited when cheking updates for youtube-dl
 */
export const checkYtdlForUpdatesEvent = () => {
  ipcRenderer.send(EDownloadEventsName.CHECk_FOR_UPDATES);
};

type IinitDownloadEvents = {
  downloadStatus: EDownloadStatus;
  changeDownloadStatus: (downloadStatus: EDownloadStatus) => void;
  updateMediaFiles: (mediaFile: Array<IFileInfo>) => void;
  updateFileProgress: (fileProgress: IFileProgress) => void;
};

/**
 * Initialize all events used for receiving the data from the main
 * @param props
 */
export const initDownloadEvents = (props: IinitDownloadEvents) => {
  const { downloadStatus, changeDownloadStatus, updateMediaFiles, updateFileProgress } = props;

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOAD_PROGRESS,
    (event: IpcMessageEvent, fileProgress: IFileProgress) => {
      if (downloadStatus !== EDownloadStatus.DOWNLOADING)
        changeDownloadStatus(EDownloadStatus.DOWNLOADING);
      updateFileProgress(fileProgress);
    }
  );

  ipcRenderer.on(EDownloadEventsName.DOWNLOAD_FINISHED, () => {
    changeDownloadStatus(EDownloadStatus.DONE);
    systemNotifications.download.downloadFinished();
  });

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOAD_INFO,
    (event: IpcMessageEvent, downloadInfo: IDownloadInfo) => {
      console.log(downloadInfo);
    }
  );

  ipcRenderer.on(EDownloadEventsName.FILE_INFO, (event: IpcMessageEvent, fileInfo: IFileInfo) => {
    updateMediaFiles([fileInfo]);
  });

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOAD_ERROR,
    (event: IpcMessageEvent, errorMessage: string) => {
      changeDownloadStatus(EDownloadStatus.ERROR);
      systemNotifications.download.downloadError();
      inAppNotifications.download.downloadError(errorMessage);
    }
  );

  ipcRenderer.on(EDownloadEventsName.UPDATE_SUCCESS, (event: IpcMessageEvent) => {
    changeDownloadStatus(EDownloadStatus.WAITING);
    messages.downloadUpdateComplete();
  });
};

/**
 * Clear all download events
 */
export const clearDownloadEvents = () => {
  ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_PROGRESS);
  ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_FINISHED);
  ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_INFO);
  ipcRenderer.removeAllListeners(EDownloadEventsName.FILE_INFO);
  ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_ERROR);
  ipcRenderer.removeAllListeners(EDownloadEventsName.UPDATE_SUCCESS);
};
