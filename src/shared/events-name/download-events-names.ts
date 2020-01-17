export enum EDownloadEventsName {
  START_DOWNLOAD = 'start-download',
  DOWNLOAD_INFO = 'download-info',
  FILE_INFO = 'file-info',
  DOWNLOAD_PROGRESS = 'download-progress',
  DOWNLOAD_FINISHED = 'download-finished'
}

export interface IDownloadInfo {
  isPlaylist?: boolean;
  nr_entries?: number;
}

export interface IFileInfo {
  entry_nr?: number;
  title?: string;
  duration?: string;
}

export interface IFileProgress {
  entry_nr: number;
  progress: number;
}
