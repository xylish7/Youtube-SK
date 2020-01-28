import { Reducer } from 'redux';

import { EDownload, IDownloadAction } from '../actions/downloadAction';
import updateObject from '../utils/update-object';
import { IFileInfo } from '../../shared/events-name/download-events-names';

export interface IDownloadOpts {
  downloadType: 'video' | 'audio';
}

export enum EDownloadStatus {
  WAITING = 'WAITING',
  FETCHING = 'FETCHING',
  DOWNLOADING = 'DOWNLOADING',
  DONE = 'DONE',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR',
  UPDATING = 'UPDATING'
}

export interface IDownloadState {
  readonly status: EDownloadStatus;
  readonly options: IDownloadOpts;
  readonly mediaFiles: Array<IFileInfo>;
  readonly filesProgress: any;
}

const defaultState: IDownloadState = {
  status: EDownloadStatus.WAITING,
  options: { downloadType: 'audio' },
  mediaFiles: [
    {
      title: 'Test',
      duration: '03:40',
      entry_nr: 1
    },
    {
      title: 'Test',
      duration: '03:40',
      entry_nr: 2
    },
    {
      title: 'Test',
      duration: '03:40',
      entry_nr: 3
    },
    {
      title: 'Test',
      duration: '03:40',
      entry_nr: 4
    }
  ],
  filesProgress: {}
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
        mediaFiles: action.mediaFile.length === 0 ? [] : [...state.mediaFiles, ...action.mediaFile]
      });

    case EDownload.UPDATE_FILE_PROGRESS:
      const entryNr: number = action.fileProgress.entry_nr;
      return updateObject(state, {
        filesProgress: {
          ...state.filesProgress,
          [entryNr]: action.fileProgress.progress
        }
      });
    default:
      return state;
  }
};
