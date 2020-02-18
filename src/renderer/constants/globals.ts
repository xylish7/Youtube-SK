import * as path from 'path';

interface RegExpression {
  URL: RegExp;
}

interface GlobalConst {
  MESSAGE_DURATION: number;
  NOTIFICATION_DURATION: number;
  NOTIFICATION_PLACEMENT: 'bottomRight' | 'topLeft' | 'topRight' | 'bottomLeft';
  YT_DL_PATH: string;
  FFMPEG_PATH: string;
}

export const regExpressions: RegExpression = {
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
};

export const globalConst: GlobalConst = {
  MESSAGE_DURATION: 3,
  NOTIFICATION_DURATION: 0,
  NOTIFICATION_PLACEMENT: 'bottomRight',
  YT_DL_PATH:
    process.env.NODE_ENV === 'production'
      ? path.resolve(
          __dirname,
          '..',
          '..',
          'app.asar.unpacked',
          'node_modules',
          'youtube-dl',
          'bin',
          'youtube-dl.exe'
        )
      : path.resolve(__dirname, '..', 'bin', 'youtube-dl.exe'),
  FFMPEG_PATH: path.resolve(__dirname, '..', 'bin', 'ffmpeg.exe')
};
