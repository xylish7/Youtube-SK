import { Action, ActionCreator } from 'redux';
import { EDownloadStatus, IDownloadOpts } from '../reducers/downloadReducer';
import { IFileInfo, IFileProgress } from '../../shared/events-name/download-events-names';

export enum EDownload {
  CHANGE_DOWNLOAD_STATUS = 'CHANGE_DOWNLOAD_STATUS',
  CHANGE_DOWNLOAD_OPTS = 'CHANGE_DOWNLOAD_OPTS',
  UPDATE_MEDIA_FILES = 'UPDATE_MEDIA_FILES',
  UPDATE_FILE_PROGRESS = 'UPDATE_FILE_PROGRESS'
}

export interface IChangeDownloadStatus extends Action {
  type: EDownload.CHANGE_DOWNLOAD_STATUS;
  downloadStatus: EDownloadStatus;
}

export interface IChangeDownloadOpts extends Action {
  type: EDownload.CHANGE_DOWNLOAD_OPTS;
  options: IDownloadOpts;
}

export interface IUpdateMediaFile extends Action {
  type: EDownload.UPDATE_MEDIA_FILES;
  mediaFile: Array<IFileInfo>;
}

export interface IUpdateFileProgress extends Action {
  type: EDownload.UPDATE_FILE_PROGRESS;
  fileProgress: IFileProgress;
}

/**
 * Get persistent data from local store
 */

export const changeDownloadStatus: ActionCreator<IChangeDownloadStatus> = (
  downloadStatus: EDownloadStatus
) => ({
  type: EDownload.CHANGE_DOWNLOAD_STATUS,
  downloadStatus
});

/**
 * Change the values of the downlod options
 *
 * @param options
 */
export const changeDownloadOpts: ActionCreator<IChangeDownloadOpts> = (options: IDownloadOpts) => ({
  type: EDownload.CHANGE_DOWNLOAD_OPTS,
  options
});

/**
 * With every file that is being downloaded, add it to
 * the array which containes the files downloaded
 *
 * @param mediaFile
 */
export const updateMediaFiles: ActionCreator<IUpdateMediaFile> = (mediaFile: Array<IFileInfo>) => ({
  type: EDownload.UPDATE_MEDIA_FILES,
  mediaFile
});

/**
 * Update the progres of the file being downloaded
 */
export const updateFileProgress: ActionCreator<IUpdateFileProgress> = (
  fileProgress: IFileProgress
) => ({
  type: EDownload.UPDATE_FILE_PROGRESS,
  fileProgress
});

export type IDownloadAction =
  | IChangeDownloadStatus
  | IChangeDownloadOpts
  | IUpdateMediaFile
  | IUpdateFileProgress;
