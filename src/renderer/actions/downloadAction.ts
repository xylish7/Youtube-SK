import { Action, ActionCreator } from 'redux';
import { EDownloadStatus } from '../reducers/downloadReducer';

export enum EDownload {
  CHANGE_DOWNLOAD_STATE = 'CHANGE_DOWNLOAD_STATE'
}

export interface IChangeDownloadState extends Action {
  type: EDownload.CHANGE_DOWNLOAD_STATE;
  downloadStatus: EDownloadStatus;
}

/**
 * Get persistent data from local store
 */

export const changeDownloadState: ActionCreator<IChangeDownloadState> = (
  downloadStatus: EDownloadStatus
) => ({
  type: EDownload.CHANGE_DOWNLOAD_STATE,
  downloadStatus
});

export type IDownloadAction = IChangeDownloadState;
