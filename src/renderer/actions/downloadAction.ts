import { Action, ActionCreator } from 'redux';
import { EDownloadStatus, IDownloadOpts } from '../reducers/downloadReducer';
import { IFileInfo } from '../../shared/events-name/download-events-names';

export enum EDownload {
  CHANGE_DOWNLOAD_STATUS = 'CHANGE_DOWNLOAD_STATUS',
  CHANGE_DOWNLOAD_OPTS = 'CHANGE_DOWNLOAD_OPTS',
  UPDATE_MEDIA_FILES = 'UPDATE_MEDIA_FILES'
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
  mediaFile: IFileInfo;
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
export const updateMediaFiles: ActionCreator<IUpdateMediaFile> = (mediaFile: IFileInfo) => ({
  type: EDownload.UPDATE_MEDIA_FILES,
  mediaFile
});

export type IDownloadAction = IChangeDownloadStatus | IChangeDownloadOpts | IUpdateMediaFile;
