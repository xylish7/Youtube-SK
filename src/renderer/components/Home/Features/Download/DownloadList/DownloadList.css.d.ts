declare namespace DownloadListCssNamespace {
  export interface IDownloadListCss {
    listContainer: string;
    listLoadingSpinner: string;
    listStatus: string;
    listTitlebar: string;
    listTitlebarConvert: string;
    listTitlebarStatus: string;
    progressContainer: string;
    resultContainer: string;
    titleProgressSpacer: string;
  }
}

declare const DownloadListCssModule: DownloadListCssNamespace.IDownloadListCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DownloadListCssNamespace.IDownloadListCss;
};

export = DownloadListCssModule;
