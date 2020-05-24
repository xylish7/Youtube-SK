declare namespace ApplicationCssNamespace {
  export interface IApplicationCss {
    container: string;
  }
}

declare const ApplicationCssModule: ApplicationCssNamespace.IApplicationCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ApplicationCssNamespace.IApplicationCss;
};

export = ApplicationCssModule;
