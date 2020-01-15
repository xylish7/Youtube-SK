import { Reducer } from 'redux';

import { EDownload, IDownloadAction } from '../actions/downloadAction';
import updateObject from '../utils/update-object';

export interface IDownloadOpts {
  convert?: boolean;
  audioAndVideo?: boolean;
}

export enum EDownloadStatus {
  WAITING = 'WAITING',
  FETCHING = 'FETCHING',
  DOWNLOADING = 'DOWNLOADING',
  DONE = 'DONE',
  STOPPED = 'STOPPED'
}

export interface IDownloadState {
  readonly status: EDownloadStatus;
  readonly options: IDownloadOpts;
}

const defaultState: IDownloadState = {
  status: EDownloadStatus.WAITING,
  options: { convert: false, audioAndVideo: false }
};

export const downloadReducer: Reducer<IDownloadState, IDownloadAction> = (
  state: IDownloadState = defaultState,
  action: IDownloadAction
): IDownloadState => {
  switch (action.type) {
    case EDownload.CHANGE_DOWNLOAD_STATUS:
      return updateObject(state, { downloadStatus: action.downloadStatus });
    case EDownload.CHANGE_DOWNLOAD_OPTS:
      return updateObject(state, {
        options: {
          ...state.options,
          ...action.options
        }
      });
    default:
      return state;
  }
};
