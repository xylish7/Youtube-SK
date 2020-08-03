import { Reducer } from 'redux';

import { EDownload, IDownloadAction } from '../actions/downloadAction';
import updateObject from '../utils/update-object';
import { IFileInfo, IDownloadInfo } from '../../shared/events-name/download-events-names';
import {
  IAudioQuality,
  IAudioFormat,
  IVideoQuality,
  IVideoFormat,
} from '../constants/persistent-data-store';
import isEmpty from '../utils/is-empty';

export type IDownloadType = 'video' | 'audio';

export interface IDownloadSettings {
  audioQuality?: IAudioQuality;
  audioFormat?: IAudioFormat;
  videoQuality?: IVideoQuality;
  videoFormat?: IVideoFormat;
}

export enum EDownloadStatus {
  WAITING = 'WAITING',
  FETCHING = 'FETCHING',
  DOWNLOADING = 'DOWNLOADING',
  DONE = 'DONE',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR',
  UPDATING = 'UPDATING',
}

export interface IDownloadState {
  readonly status: EDownloadStatus;
  readonly savePath: string;
  readonly type: IDownloadType;
  readonly settings: IDownloadSettings;
  readonly mediaFiles: Array<IFileInfo>;
  readonly filesProgress: any;
  readonly info: IDownloadInfo;
  readonly downloadedFileIndex: number;
}

const defaultState: IDownloadState = {
  status: EDownloadStatus.WAITING,
  savePath: '',
  type: 'audio',
  settings: {
    audioQuality: 'best',
    audioFormat: 'mp3',
    videoQuality: 'best',
    videoFormat: 'mp4',
  },
  mediaFiles: [],
  filesProgress: {},
  info: {},
  downloadedFileIndex: 0,
};

export const downloadReducer: Reducer<IDownloadState, IDownloadAction> = (
  state: IDownloadState = defaultState,
  action: IDownloadAction
): IDownloadState => {
  switch (action.type) {
    case EDownload.SET_DOWNLOAD_PERSISTENT_DATA:
      return updateObject(state, {
        savePath: !isEmpty(action.persistentData.savePath)
          ? action.persistentData.savePath
          : state.savePath,
        settings: !isEmpty(action.persistentData.settings)
          ? updateObject(state.settings, action.persistentData.settings)
          : { ...state.settings },
      });

    case EDownload.CHANGE_DOWNLOAD_STATUS:
      return updateObject(state, { status: action.downloadStatus });

    case EDownload.CHANGE_DOWNLOAD_TYPE:
      return updateObject(state, {
        type: action.downloadType,
      });

    case EDownload.UPDATE_MEDIA_FILES:
      return updateObject(state, {
        mediaFiles: action.mediaFile.length === 0 ? [] : [...state.mediaFiles, ...action.mediaFile],
      });

    case EDownload.UPDATE_FILE_PROGRESS:
      const entryNr: number = action.filesProgress.entry_nr;
      console.log(action.filesProgress);
      // If files progress is empty object set it to an empty object in the store
      if (
        Object.keys(action.filesProgress).length === 0 &&
        action.filesProgress.constructor === Object
      )
        return updateObject(state, { filesProgress: {} });

      // Update the files progress with the current progress
      return updateObject(state, {
        filesProgress: {
          ...state.filesProgress,
          [entryNr]: action.filesProgress.progress,
        },
      });
    case EDownload.SET_DOWNLOAD_INFO:
      return updateObject(state, {
        info: action.downloadInfo,
      });
    case EDownload.SET_DOWNLOADED_FILE_INDEX:
      return updateObject(state, {
        downloadedFileIndex: action.downloadedFileIndex,
      });
    default:
      return state;
  }
};
