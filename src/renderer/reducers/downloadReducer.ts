import { Reducer } from 'redux';

import { EDownload, IDownloadAction } from '../actions/downloadAction';
import updateObject from '../utils/update-object';
import { IFileInfo } from '../../shared/events-name/download-events-names';

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
  readonly mediaFiles: Array<IFileInfo>;
}

const defaultState: IDownloadState = {
  status: EDownloadStatus.WAITING,
  options: { convert: false, audioAndVideo: false },
  mediaFiles: []
};

export const downloadReducer: Reducer<IDownloadState, IDownloadAction> = (
  state: IDownloadState = defaultState,
  action: IDownloadAction
): IDownloadState => {
  switch (action.type) {
    case EDownload.CHANGE_DOWNLOAD_STATUS:
      return updateObject(state, { status: action.downloadStatus });

    case EDownload.CHANGE_DOWNLOAD_OPTS:
      return updateObject(state, {
        options: {
          ...state.options,
          ...action.options
        }
      });

    case EDownload.UPDATE_MEDIA_FILES:
      return updateObject(state, {
        mediaFiles: [...state.mediaFiles, action.mediaFile]
      });
    default:
      return state;
  }
};
