declare namespace HomeCssModule {
  export interface IHomeCss {
    container: string;
  }
}

declare const HomeCssModule: HomeCssModule.IHomeCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomeCssModule.IHomeCss;
};

export = HomeCssModule;
