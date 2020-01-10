declare namespace DownloadCssModule {
  export interface IDownloadCss {
    cardSavePath: string;
    openFolderIcon: string;
    pathText: string;
  }
}

declare const DownloadCssModule: DownloadCssModule.IDownloadCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DownloadCssModule.IDownloadCss;
};

export = DownloadCssModule;
