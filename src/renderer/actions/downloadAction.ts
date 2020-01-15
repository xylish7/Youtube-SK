import { Action, ActionCreator } from 'redux';
import { EDownloadStatus, IDownloadOpts } from '../reducers/downloadReducer';

export enum EDownload {
  CHANGE_DOWNLOAD_STATUS = 'CHANGE_DOWNLOAD_STATUS',
  CHANGE_DOWNLOAD_OPTS = 'CHANGE_DOWNLOAD_OPTS'
}

export interface IChangeDownloadStatus extends Action {
  type: EDownload.CHANGE_DOWNLOAD_STATUS;
  downloadStatus: EDownloadStatus;
}

export interface IChangeDownloadOpts extends Action {
  type: EDownload.CHANGE_DOWNLOAD_OPTS;
  options: IDownloadOpts;
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

export const changeDownloadOpts: ActionCreator<IChangeDownloadOpts> = (options: IDownloadOpts) => ({
  type: EDownload.CHANGE_DOWNLOAD_OPTS,
  options
});

export type IDownloadAction = IChangeDownloadStatus | IChangeDownloadOpts;
