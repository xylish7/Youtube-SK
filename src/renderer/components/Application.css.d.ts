declare namespace ApplicationCssModule {
  export interface IApplicationCss {
    container: string;
  }
}

declare const ApplicationCssModule: ApplicationCssModule.IApplicationCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ApplicationCssModule.IApplicationCss;
};

export = ApplicationCssModule;
