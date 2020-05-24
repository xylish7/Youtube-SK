declare namespace DownloadSettingsCssNamespace {
  export interface IDownloadSettingsCss {
    optionsContainer: string;
  }
}

declare const DownloadSettingsCssModule: DownloadSettingsCssNamespace.IDownloadSettingsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DownloadSettingsCssNamespace.IDownloadSettingsCss;
};

export = DownloadSettingsCssModule;
