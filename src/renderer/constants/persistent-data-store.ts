interface UserPrefStore {
  readonly store: {
    readonly defaults: {};
    readonly configName: string;
  };
  readonly valuesNames: {
    downloadSavePath: string;
  };
}

export const USER_PREFERENCES: UserPrefStore = {
  store: {
    configName: 'user-preferences',
    defaults: {}
  },
  valuesNames: {
    downloadSavePath: 'download-save-path'
  }
};
