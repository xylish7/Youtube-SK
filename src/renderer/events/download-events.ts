import {
  IFileInfo,
  EDownloadEventsName,
  IFilesProgress,
  IDownloadInfo,
} from '../../shared/events-name/download-events-names';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { EDownloadStatus, IDownloadSettings } from '../reducers/downloadReducer';

import systemNotifications from '../notifications/system-notifications';
import inAppNotifications from '../notifications/in-app-notifications';
import messages from '../notifications/messages';
import { IDownloadType } from '../reducers/downloadReducer';

export type IStartDownloadEParams = {
  downloadSettings: IDownloadSettings;
  downloadType: IDownloadType;
};

/**
 * Event: emited when the download starts
 * @param {string} url to file which will be downloaded
 * @param {IStartDownloadEParams} startDownloadEParams related to quality, format, downloadType etc of the file
 */
export const startDownloadEvent = (url: string, startDownloadEParams: IStartDownloadEParams) => {
  ipcRenderer.send(EDownloadEventsName.START_DOWNLOAD, { url, startDownloadEParams });
};

/**
 * Event: emited when the stop button is pressed
 */
export const stopDownloadEvent = () => {
  ipcRenderer.send(EDownloadEventsName.STOP_DOWNLOAD);
};

/**
 * Event: emited when cheking updates for youtube-dl
 */
export const checkYtdlForUpdatesEvent = () => {
  ipcRenderer.send(EDownloadEventsName.CHECK_FOR_UPDATES);
};

type IinitDownloadEvents = {
  downloadStatus: EDownloadStatus;
  changeDownloadStatus: (downloadStatus: EDownloadStatus) => void;
  updateMediaFiles: (mediaFile: Array<IFileInfo>) => void;
  updateFilesProgress: (filesProgress: IFilesProgress) => void;
  setDownloadInfo: (downloadDetails: IDownloadInfo) => void;
  setDownloadedFileIndex: (downloadedFileIndex: number) => void;
};

/**
 * Initialize all events used for receiving the data from the main
 * @param props
 */
export const initRendererDownloadEvents = (props: IinitDownloadEvents) => {
  const {
    downloadStatus,
    changeDownloadStatus,
    updateMediaFiles,
    updateFilesProgress,
    setDownloadInfo,
    setDownloadedFileIndex,
  } = props;

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOAD_PROGRESS,
    (event: IpcRendererEvent, filesProgress: IFilesProgress) => {
      if (downloadStatus !== EDownloadStatus.DOWNLOADING)
        changeDownloadStatus(EDownloadStatus.DOWNLOADING);
      updateFilesProgress(filesProgress);
    }
  );

  ipcRenderer.on(EDownloadEventsName.DOWNLOAD_FINISHED, () => {
    changeDownloadStatus(EDownloadStatus.DONE);
    systemNotifications.download.downloadFinished();
  });

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOAD_INFO,
    (event: IpcRendererEvent, downloadInfo: IDownloadInfo) => {
      setDownloadInfo(downloadInfo);
    }
  );

  ipcRenderer.on(EDownloadEventsName.FILE_INFO, (event: IpcRendererEvent, fileInfo: IFileInfo) => {
    updateMediaFiles([fileInfo]);
  });

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOAD_ERROR,
    (event: IpcRendererEvent, errorMessage: string) => {
      // If error is to long, shorten it
      if (errorMessage) {
        const shortErrorMessage: string = `${errorMessage.substring(0, 400)} ...`;
        changeDownloadStatus(EDownloadStatus.ERROR);
        systemNotifications.download.downloadError();
        inAppNotifications.download.downloadError(shortErrorMessage);
      }
    }
  );

  ipcRenderer.on(EDownloadEventsName.UPDATE_SUCCESS, () => {
    changeDownloadStatus(EDownloadStatus.WAITING);
    messages.downloadUpdateComplete();
  });

  ipcRenderer.on(
    EDownloadEventsName.DOWNLOADED_FILE_INDEX,
    (event: IpcRendererEvent, downloadedFileIndex: number) => {
      setDownloadedFileIndex(downloadedFileIndex);
    }
  );
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
