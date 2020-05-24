import youtubedl from 'youtube-dl';
import ytdlDownloader from 'youtube-dl/lib/downloader';
import * as path from 'path';
import * as fs from 'fs';
import isEmpty from '../../renderer/utils/is-empty';
import LocalStore from '../../renderer/utils/local-store';
import { USER_PREFERENCES, EUserPrefStore } from '../../renderer/constants/persistent-data-store';
import { IpcMessageEvent } from 'electron';
import {
  EDownloadEventsName,
  IDownloadInfo,
  IFileInfo
} from '../../shared/events-name/download-events-names';
import { globalConst } from '../../renderer/constants/globals';
import { IStartDownloadEParams } from '../../renderer/events/download-events';
import { IDownloadType, IDownloadSettings } from '../../renderer/reducers/downloadReducer';

/**
 * Class used to download video/audio files from youtube
 */
export default class DownloadService {
  event: IpcMessageEvent;
  downloadSavePath: string;
  downloadInfo: IDownloadInfo;
  fileInfo: IFileInfo;
  downloadType: IDownloadType;
  downloadSettings: IDownloadSettings;

  /**
   * Initialize values
   * @param {IpcMessageEvent} event - message event used to send back data
   */
  constructor(event: IpcMessageEvent, downloadParams: IStartDownloadEParams) {
    this.event = event;
    this.downloadSavePath = this.setDownloadPath();
    this.downloadInfo = {};
    this.fileInfo = {};
    this.downloadType = downloadParams.downloadType;
    this.downloadSettings = downloadParams.downloadSettings;
  }

  /**
   * Download video/audio by providing the link to it
   * @param {string} url - url to file
   */
  download = (url: string) => {
    const video = youtubedl(url, [
      '--ffmpeg-location',
      globalConst.FFMPEG_PATH,
      '-f',
      'bestaudio',
      '--extract-audio',
      '--audio-format',
      'mp3'
    ]);

    // Handle errors on download of the file
    video.on('error', (err: any) => {
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_ERROR, err.stderr);
    });

    // Handle video information at the start of the file download
    let size: number = 0;
    video.on('info', (info: any) => {
      this.sendDownloadAndFileInfo(info);

      size = info.size;
      const filePath = `${this.downloadSavePath}/${this.trimBadChars(info.title)}.mp4`;
      video.pipe(fs.createWriteStream(filePath));
    });

    // Handle downloaded chunks from file
    let pos: number = 0;
    let lastPercentValue: number = 0;

    video.on('data', (chunk: any) => {
      pos += chunk.length;
      if (size) {
        // Convert percentage to rounded number. Ex: 24%
        let percent: number = parseInt(((pos / size) * 100).toFixed(0));
        // Send values to renderer process only if [percent] % === 0. Ex: 0, 4, 8, ...
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

    // Downlaod next file if a playlist is downloaded
    video.on('next', this.download);
  };

  /**
   * Check if there are new updates for yt-dl.exe file
   */
  static checkForUpdates = (event: IpcMessageEvent) => {
    ytdlDownloader(`${globalConst.YT_DL_PATH}/../`, (err: any, done: any) => {
      if (err) throw err;
      else event.sender.send(EDownloadEventsName.UPDATE_SUCCESS);
    });
  };

  /**
   * Set the the path to where the files will be saved
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
   * Event which tolds that the download is finished
   */
  private downloadFinished = (): void => {
    // if the url is not a playlist, when the download is finished
    // send the event
    if (!this.downloadInfo.isPlaylist)
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_FINISHED);
    // if the url is a playlist send the event when the number of downloaded
    //  files is equal to the number of files of the playlist
    else if (this.downloadInfo.nr_entries === this.fileInfo.entry_nr)
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_FINISHED);
  };

  /**
   * Remove any unsupported characters from the title
   * of the file so it can be saved in a folded on the
   * user station
   */
  private trimBadChars = (title: string): string => {
    return title.replace(/[\\/|":*?<>']/g, '');
  };
}

// ./youtube-dl.exe --ffmpeg-location 'C:\Users\FilipFrincu\Documents\personal_projects\YouTube-SK\bin' -f bestvideo['height>=1080']+bestaudio[ext=m4a] https://www.youtube.com/watch?v=9Yam5B_iasY
// bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4
