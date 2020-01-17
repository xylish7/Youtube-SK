import youtubedl from 'youtube-dl';
import * as path from 'path';
import * as fs from 'fs';

import LocalStore from '../../renderer/utils/local-store';
import { USER_PREFERENCES, EUserPrefStore } from '../../renderer/constants/persistent-data-store';
import { IpcMessageEvent } from 'electron';
import {
  EDownloadEventsName,
  IDownloadInfo,
  IFileInfo
} from '../../shared/events-name/download-events-names';
import isEmpty from '../../renderer/utils/is-empty';

interface IDownloadService {
  event: IpcMessageEvent;
  downloadSavePath: string;
  downloadInfo: IDownloadInfo;
  fileInfo: IFileInfo;
  download: (url: string) => void;
}

export default class DownloadService implements IDownloadService {
  event: IpcMessageEvent;
  downloadSavePath: string;
  downloadInfo: IDownloadInfo;
  fileInfo: IFileInfo;

  constructor(event: IpcMessageEvent) {
    this.event = event;
    this.downloadSavePath = this.setDownloadPath();
    this.downloadInfo = {};
    this.fileInfo = {};

    this.setCustomYtdlPath();
  }

  /**
   * Function to download the videos
   */
  download = (url: string) => {
    const video = youtubedl(url);

    // Handle error
    video.on('error', function error(err: any) {
      console.log('error 2:', err);
    });

    // Handle video information
    let size: number = 0;
    video.on('info', (info: any) => {
      this.sendDownloadAndFileInfo(info);

      size = info.size;
      const filePath = `${this.downloadSavePath}/${this.trimBadChars(info.title)}.mp4`;
      video.pipe(fs.createWriteStream(filePath));
    });

    // Handle incoming data
    let pos: number = 0;
    let lastPercentValue: number = 0;
    video.on('data', (chunk: any) => {
      pos += chunk.length;
      // `size` should not be 0 here.
      if (size) {
        let percent: number = parseInt(((pos / size) * 100).toFixed(0));
        if (percent % 4 === 0 && lastPercentValue !== percent) {
          lastPercentValue = percent;
          this.event.sender.send(EDownloadEventsName.DOWNLOAD_PROGRESS, {
            entry_nr: this.fileInfo.entry_nr,
            progress: percent
          });
        }
      }
    });

    // Handle download finished
    video.on('end', () => {
      this.downloadFinished();
    });

    // Downlaod next video
    video.on('next', this.download);
  };

  /**
   * Set the path to the youtube-dl executable
   */
  private setCustomYtdlPath(): void {
    const customBinaryPath = path.resolve(
      __dirname,
      '..',
      'node_modules',
      'youtube-dl',
      'bin',
      'youtube-dl.exe'
    );

    youtubedl.setYtdlBinary(customBinaryPath);
  }

  /**
   * Set the the path to where the files will be save
   */
  private setDownloadPath(): string {
    const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

    return userPrefStore.get(EUserPrefStore.DOWNLOAD_SAVE_PATH);
  }

  /**
   * Send download info data only once to renderer process.
   * Also send the file info at the start of every download
   * of a file
   */
  private sendDownloadAndFileInfo = (info: any): void => {
    // Send downlaod info once
    if (isEmpty(this.downloadInfo)) {
      this.downloadInfo = {
        isPlaylist: info.playlist ? true : false,
        nr_entries: info.playlist ? info.n_entries : 1
      };
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_INFO, this.downloadInfo);
    }

    // Send file info for every file when it starts to be downloaded
    this.fileInfo = {
      title: info.title,
      duration: info.duration,
      entry_nr: info.playlist ? info.playlist_index : 1
    };
    this.event.sender.send(EDownloadEventsName.FILE_INFO, this.fileInfo);
  };

  /**
   * Send event when the download is finished
   */
  private downloadFinished = (): void => {
    if (!this.downloadInfo.isPlaylist)
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_FINISHED);
    else if (this.downloadInfo.nr_entries === this.fileInfo.entry_nr)
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_FINISHED);
  };

  /**
   * Remove any unsupported characters from the title
   * of the file
   */
  private trimBadChars = (title: string): string => {
    return title.replace(/[\\/|":*?<>']/g, '');
  };
}
