import youtubedl from 'youtube-dl';
import * as path from 'path';
import * as fs from 'fs';

import LocalStore from '../../renderer/utils/local-store';
import { USER_PREFERENCES } from '../../renderer/constants/persistent-data-store';
import { IpcMessageEvent } from 'electron';
import EDownloadEventsName from '../../shared/events-name/download-events-names';

interface IDownloadService {
  event: IpcMessageEvent;
  url: string;
  downloadSavePath: string;
  // isPlaylist: boolean;

  download: () => void;
}

export default class DownloadService implements IDownloadService {
  event: IpcMessageEvent;
  url: string;
  downloadSavePath: string;
  // isPlaylist: boolean;

  constructor(event: IpcMessageEvent, url: string) {
    this.event = event;
    this.url = url;
    // this.isPlaylist = isPlaylist;
    this.downloadSavePath = this.setDownloadPath();

    this.setCustomYtdlPath();
  }

  download() {
    const video = youtubedl(this.url);

    // Handle error
    video.on('error', function error(err: any) {
      console.log('error 2:', err);
    });

    // Handle video information
    let size: number = 0;
    video.on('info', (info: any) => {
      size = info.size;
      video.pipe(fs.createWriteStream(`${this.downloadSavePath}/${info.title}.mp4`));
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
          this.event.sender.send(EDownloadEventsName.DOWNLOAD_PROGRESS, percent);
        }
      }
    });

    // Handle download finished
    video.on('end', () => {
      this.event.sender.send(EDownloadEventsName.DOWNLOAD_FINISHED);
    });

    // Downlaod next video
    video.on('next', this.download);
  }

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

  private setDownloadPath(): string {
    const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

    return userPrefStore.get(USER_PREFERENCES.valuesNames.downloadSavePath);
  }
}
