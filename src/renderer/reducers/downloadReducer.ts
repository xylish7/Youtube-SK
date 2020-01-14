import { Reducer } from 'redux';

import { EDownload, IDownloadAction } from '../actions/downloadAction';
import updateObject from '../utils/update-object';

export enum EDownloadStatus {
  WAITING = 'WAITING',
  FETCHING = 'FETCHING',
  DOWNLOADING = 'DOWNLOADING',
  DONE = 'DONE',
  STOPPED = 'STOPPED'
}

export interface IDownloadState {
  readonly downloadStatus: EDownloadStatus;
}

const defaultState: IDownloadState = {
  downloadStatus: EDownloadStatus.WAITING
};

export const downloadReducer: Reducer<IDownloadState, IDownloadAction> = (
  state: IDownloadState = defaultState,
  action: IDownloadAction
): IDownloadState => {
  switch (action.type) {
    case EDownload.CHANGE_DOWNLOAD_STATE:
      return updateObject(state, { downloadStatus: action.downloadStatus });

    default:
      return state;
  }
};
