export enum EAppColor {
  BLUE = '#1890ff',
  TURQUOISE = '#00d1b2',
  RED = '#ff3860'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum EUserPrefStore {
  DOWNLOAD_SAVE_PATH = 'downloadSavePath',
  THEME_MODE = 'themeMode',
  APP_COLOR = 'appColor'
}

export interface IChangedValues {
  [EUserPrefStore.DOWNLOAD_SAVE_PATH]?: string;
  [EUserPrefStore.THEME_MODE]?: ThemeMode;
  [EUserPrefStore.APP_COLOR]?: EAppColor;
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
    defaults: { themeMode: ThemeMode.LIGHT, appColor: EAppColor.BLUE }
  }
};
