export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum EUserPrefStore {
  DOWNLOAD_SAVE_PATH = 'downloadSavePath',
  THEME_MODE = 'themeMode'
}

export interface IChangedValues {
  [EUserPrefStore.DOWNLOAD_SAVE_PATH]?: string;
  [EUserPrefStore.THEME_MODE]?: ThemeMode;
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
    defaults: { themeMode: ThemeMode.LIGHT }
  }
};
