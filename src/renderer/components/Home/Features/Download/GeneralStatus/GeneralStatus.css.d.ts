declare namespace GeneralStatusCssModule {
  export interface IGeneralStatusCss {
    generalStatus: string;
    tag: string;
  }
}

declare const GeneralStatusCssModule: GeneralStatusCssModule.IGeneralStatusCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GeneralStatusCssModule.IGeneralStatusCss;
};

export = GeneralStatusCssModule;
