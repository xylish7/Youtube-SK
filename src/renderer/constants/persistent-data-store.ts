export enum EAppColor {
  BLUE = '#1890ff',
  TURQUOISE = '#00d1b2',
  RED = '#ff3860'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export type IAudioQuality =
  | 'best'
  | '64'
  | '80'
  | '96'
  | '128'
  | '160'
  | '192'
  | '224'
  | '256'
  | '320';
export type IAudioFormat = 'mp3' | 'm4a' | 'ogg' | 'wma';
export type IVideoQuality =
  | 'best'
  | '144'
  | '240'
  | '360'
  | '480'
  | '720'
  | '1080'
  | '1440'
  | '2160';
export type IVideoFormat = 'mp4' | 'webm' | '3gp';

export enum EUserPrefStore {
  DOWNLOAD_SAVE_PATH = 'downloadSavePath',
  THEME_MODE = 'themeMode',
  APP_COLOR = 'appColor',
  DOWNLOAD_AUDIO_QUALITY = 'downloadAudioQuality',
  DOWNLOAD_AUDIO_FORMAT = 'downloadAudioFormat',
  DOWNLOAD_VIDEO_QUALITY = 'downloadVideoQuality',
  DOWNLOAD_VIDEO_FORMAT = 'downloadVideoFormat'
}

export interface IChangedValues {
  [EUserPrefStore.DOWNLOAD_SAVE_PATH]?: string;
  [EUserPrefStore.THEME_MODE]?: ThemeMode;
  [EUserPrefStore.APP_COLOR]?: EAppColor;
  [EUserPrefStore.DOWNLOAD_AUDIO_QUALITY]?: IAudioQuality;
  [EUserPrefStore.DOWNLOAD_AUDIO_FORMAT]?: IAudioFormat;
  [EUserPrefStore.DOWNLOAD_VIDEO_QUALITY]?: IVideoQuality;
  [EUserPrefStore.DOWNLOAD_VIDEO_FORMAT]?: IVideoFormat;
}

interface IPersistentStore {
  readonly store: {
    readonly defaults: {};
    readonly configName: string;
  };
}

export const USER_PREFERENCES: IPersistentStore = {
  store: {
    configName: 'user-preferences',
    defaults: {
      themeMode: ThemeMode.LIGHT,
      appColor: EAppColor.BLUE,
      downloadAudioQuality: '128',
      downloadAudioFormat: 'mp3',
      downloadVideoQuality: '720',
      downloadVideoFormat: 'mp4'
    }
  }
};
