import { globalConst } from '../../renderer/constants/globals';
import { spawn } from 'child_process';
import { IpcMainEvent } from 'electron';
import { IStartDownloadEParams } from '../../renderer/events/download-events';
import { IDownloadInfo, IFileInfo } from '../../shared/events-name/download-events-names';
import { IDownloadSettings } from '../../renderer/reducers/downloadReducer';
import LocalStore from '../../renderer/utils/local-store';
import { USER_PREFERENCES, EUserPrefStore } from '../../renderer/constants/persistent-data-store';

export default class ConvertService {
  private event: IpcMainEvent;
  private filesPath: string;
  private downloadInfo: IDownloadInfo;
  private fileInfo: IFileInfo;
  private downloadSettings: IDownloadSettings;
  private fileDuration: number;
  private convertedPercent: number;

  /**
   * Initialize values
   * @param {IpcMainEvent} event - message event used to send back data
   */
  constructor(event: IpcMainEvent, downloadParams: IStartDownloadEParams) {
    this.event = event;
    this.filesPath = this.setFilePath();
    this.downloadInfo = {};
    this.fileInfo = {};
    this.downloadSettings = downloadParams.downloadSettings;
    this.fileDuration = 0;
    this.convertedPercent = 0;
  }
  // var spawnAttributes = {
  //   ffmpeg_path: globalConst.FFMPEG_PATH,
  //   args: [
  //     "-i",
  //     `${downloadInfo.savePath}\\${playlistInfo.dynamic.title}.${downloadInfo.video_format}`,
  //     "-map",
  //     "0:a:0",
  //     "-b:a",
  //     `${downloadInfo.audio_quality}`,
  //     "-y",
  //     `${downloadInfo.savePath}\\${playlistInfo.dynamic.title}.${downloadInfo.audio_format}`
  //   ],
  //   options: {
  //     detached: false
  //   }
  // };

  public convert(): void {
    const args = [
      '-i',
      'C:\\Users\\FilipFrincu\\Desktop\\yt-test-files\\test.mp4',
      '-map',
      '0:a:0',
      '-b:a',
      `128`,
      '-y',
      `C:\\Users\\FilipFrincu\\Desktop\\yt-test-files\\test.mp3`,
    ];

    var ffmpeg = spawn(globalConst.FFMPEG_PATH, args, { detached: false });

    ffmpeg.stderr.on('data', (data: Buffer) => {
      const dataAsString = data.toString();

      this.fileDuration = this.getFileDuration(dataAsString) || this.fileDuration;

      if (this.fileDuration) {
        this.getConvertedPercent(dataAsString);

        console.log(this.convertedPercent);
      }
    });

    ffmpeg.on('exit', (code) => {
      console.log('ConvertService -> convert -> code', code);
    });

    ffmpeg.on('error', (err) => {
      console.log('ConvertService -> convert -> err', err);
    });
  }

  /**
   * Get the total duration in seconds of the file from the [ffmpegOutput]
   * Duration in ffmpeg must be written like this: Duration: 00:03:45.74
   *
   * @param ffmpegOutput
   * @returns duration in seconds
   */
  private getFileDuration(ffmpegOutput: string): number | undefined {
    return this.convertTimeInSeconds(ffmpegOutput, /Duration: ([0-9]\d):([0-5]\d):([0-5]\d)/g);
  }

  /**
   * Get how much of the file was converted to the desired format
   *
   * @param ffmpegOutput
   */
  private getConvertedPercent(ffmpegOutput: string): void {
    const currentTime = this.convertTimeInSeconds(ffmpegOutput, /=([0-9]\d):([0-5]\d):([0-5]\d)/g);

    if (currentTime)
      this.convertedPercent = parseInt(((100 * currentTime) / this.fileDuration).toFixed(0));
  }

  /**
   * Find the matched regex and if the matched regex contains a string
   * which looks like this: 00:45:23.13 transform it in seconds
   *
   * @param ffmpegOutput strin in wich to search for the regex
   * @param regexExp
   *
   * returns number of seconds
   */
  private convertTimeInSeconds(ffmpegOutput: String, regexExp: RegExp): number | undefined {
    const timeArray: RegExpMatchArray | null = ffmpegOutput.match(regexExp);

    if (timeArray) {
      const duration: Array<number> = timeArray[0]
        .split(':')
        .map((value) => parseInt(value.trim().replace('=', '')))
        .filter((value) => !isNaN(value));

      return duration[0] * 3600 + duration[1] * 60 + duration[2];
    }
  }

  /**
   * Set the the path to where the files will be saved
   */
  private setFilePath(): string {
    const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

    return userPrefStore.get(EUserPrefStore.DOWNLOAD_SAVE_PATH);
  }
}
