import { Action, ActionCreator } from 'redux';
import { EDownloadStatus, IDownloadSettings, IDownloadType } from '../reducers/downloadReducer';
import {
  IFileInfo,
  IFilesProgress,
  IDownloadInfo,
} from '../../shared/events-name/download-events-names';
import LocalStore from '../utils/local-store';
import { USER_PREFERENCES, IChangedValues } from '../constants/persistent-data-store';
import isEmpty from '../utils/is-empty';

export enum EDownload {
  SET_DOWNLOAD_PERSISTENT_DATA = 'SET_DOWNLOAD_PERSISTENT_DATA',
  CHANGE_DOWNLOAD_STATUS = 'CHANGE_DOWNLOAD_STATUS',
  CHANGE_DOWNLOAD_TYPE = 'CHANGE_DOWNLOAD_TYPE',
  UPDATE_MEDIA_FILES = 'UPDATE_MEDIA_FILES',
  UPDATE_FILE_PROGRESS = 'UPDATE_FILE_PROGRESS',
  SET_DOWNLOAD_INFO = 'SET_DOWNLOAD_INFO',
  SET_DOWNLOADED_FILE_INDEX = 'SET_DOWNLOADED_FILE_INDEX',
}

export type IDownloadPersistentData = {
  savePath?: string;
  settings?: IDownloadSettings;
};

export interface ISetDownloadPersistentData extends Action {
  type: EDownload.SET_DOWNLOAD_PERSISTENT_DATA;
  persistentData: IDownloadPersistentData;
}

export interface IChangeDownloadStatus extends Action {
  type: EDownload.CHANGE_DOWNLOAD_STATUS;
  downloadStatus: EDownloadStatus;
}

export interface IChangeDownloadOpts extends Action {
  type: EDownload.CHANGE_DOWNLOAD_TYPE;
  downloadType: IDownloadType;
}

export interface IUpdateMediaFile extends Action {
  type: EDownload.UPDATE_MEDIA_FILES;
  mediaFile: Array<IFileInfo>;
}

export interface IUpdateFileProgress extends Action {
  type: EDownload.UPDATE_FILE_PROGRESS;
  filesProgress: IFilesProgress;
}

export interface ISetDownloadInfo extends Action {
  type: EDownload.SET_DOWNLOAD_INFO;
  downloadInfo: IDownloadInfo;
}

export interface ISetDownloadedFileIndex extends Action {
  type: EDownload.SET_DOWNLOADED_FILE_INDEX;
  downloadedFileIndex: number;
}

export const setPersistentDownloadData: ActionCreator<ISetDownloadPersistentData> = (
  persistentData: IDownloadPersistentData,
  changedValues: IChangedValues
) => {
  if (!isEmpty(changedValues)) LocalStore.setValues(USER_PREFERENCES.store, changedValues);

  return {
    type: EDownload.SET_DOWNLOAD_PERSISTENT_DATA,
    persistentData,
  };
};

/**
 * Change the status of the downlaod process
 * @param {EDownloadStatus} downloadStatus - tells in which state is the download
 */
export const changeDownloadStatus: ActionCreator<IChangeDownloadStatus> = (
  downloadStatus: EDownloadStatus
) => ({
  type: EDownload.CHANGE_DOWNLOAD_STATUS,
  downloadStatus,
});

/**
 * Change the values of the downlod options
 * @param {IDownloadType} options
 */
export const changeDownloadType: ActionCreator<IChangeDownloadOpts> = (
  downloadType: IDownloadType
) => ({
  type: EDownload.CHANGE_DOWNLOAD_TYPE,
  downloadType,
});

/**
 * With every file that is being downloaded, add it to
 * the array which containes the downloaded files
 *
 * @param mediaFile
 */
export const updateMediaFiles: ActionCreator<IUpdateMediaFile> = (mediaFile: Array<IFileInfo>) => ({
  type: EDownload.UPDATE_MEDIA_FILES,
  mediaFile,
});

/**
 * Update the progres of the file being downloaded
 */
export const updateFilesProgress: ActionCreator<IUpdateFileProgress> = (
  filesProgress: IFilesProgress
) => ({
  type: EDownload.UPDATE_FILE_PROGRESS,
  filesProgress,
});

export const setDownloadInfo: ActionCreator<ISetDownloadInfo> = (downloadInfo: IDownloadInfo) => ({
  type: EDownload.SET_DOWNLOAD_INFO,
  downloadInfo,
});

/**
 * Set downloaded file index
 */
export const setDownloadedFileIndex: ActionCreator<ISetDownloadedFileIndex> = (
  downloadedFileIndex: number
) => ({
  type: EDownload.SET_DOWNLOADED_FILE_INDEX,
  downloadedFileIndex,
});

export type IDownloadAction =
  | ISetDownloadPersistentData
  | IChangeDownloadStatus
  | IChangeDownloadOpts
  | IUpdateMediaFile
  | IUpdateFileProgress
  | ISetDownloadInfo
  | ISetDownloadedFileIndex;
