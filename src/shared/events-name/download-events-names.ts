export enum EDownloadEventsName {
  START_DOWNLOAD = 'start-download',
  STOP_DOWNLOAD = 'stop-download',
  DOWNLOAD_INFO = 'download-info',
  FILE_INFO = 'file-info',
  DOWNLOAD_PROGRESS = 'download-progress',
  DOWNLOAD_FINISHED = 'download-finished',
  DOWNLOAD_ERROR = 'download-error',
  DOWNLOADED_FILE_INDEX = 'file-index',
  CHECK_FOR_UPDATES = 'check-for-updates',
  UPDATE_SUCCESS = 'update-success',
}

export interface IDownloadInfo {
  isPlaylist?: boolean;
  nrOfEntries?: number;
}

export interface IFileInfo {
  entry_nr?: number;
  title?: string;
  duration?: string;
}

export interface IFilesProgress {
  entry_nr: number;
  progress: number;
}
