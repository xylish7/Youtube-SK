declare namespace DownloadCssNamespace {
  export interface IDownloadCss {
    inputContainer: string;
    options: string;
    pathText: string;
    selectFolderContainer: string;
  }
}

declare const DownloadCssModule: DownloadCssNamespace.IDownloadCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DownloadCssNamespace.IDownloadCss;
};

export = DownloadCssModule;
