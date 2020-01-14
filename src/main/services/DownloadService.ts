import youtubedl from 'youtube-dl';
import * as path from 'path';
import * as fs from 'fs';

interface IDownloadService {
  url: string;
  isPlaylist: boolean;
  download: () => void;
}

export default class DownloadService implements IDownloadService {
  url: string;
  isPlaylist: boolean;

  constructor(url: string, isPlaylist: boolean = false) {
    this.url = url;
    this.isPlaylist = isPlaylist;

    this.setCustomYtdlPath();
  }

  download() {
    const video = youtubedl(this.url);

    video.on('error', function error(err: any) {
      console.log('error 2:', err);
    });
    let size = 0;
    video.on('info', function(info: any) {
      size = info.size;
      let output = 'C:/Users/FilipFrincu/Desktop/test.mp4';
      video.pipe(fs.createWriteStream(output));
    });
    let pos = 0;
    video.on('data', function data(chunk: any) {
      pos += chunk.length;
      // `size` should not be 0 here.
      if (size) {
        let percent = ((pos / size) * 100).toFixed(2);
        console.log('TCL: DownloadService -> data -> percent', percent);
      }
    });
    video.on('next', this.download);
  }

  private setCustomYtdlPath() {
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
}
