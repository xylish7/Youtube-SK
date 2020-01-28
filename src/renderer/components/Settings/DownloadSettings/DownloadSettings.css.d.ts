declare namespace DownloadSettingsCssModule {
  export interface IDownloadSettingsCss {
    optionsContainer: string;
  }
}

declare const DownloadSettingsCssModule: DownloadSettingsCssModule.IDownloadSettingsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DownloadSettingsCssModule.IDownloadSettingsCss;
};

export = DownloadSettingsCssModule;
