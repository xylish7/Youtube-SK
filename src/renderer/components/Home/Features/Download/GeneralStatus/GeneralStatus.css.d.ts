declare namespace GeneralStatusCssNamespace {
  export interface IGeneralStatusCss {
    generalStatus: string;
    tag: string;
  }
}

declare const GeneralStatusCssModule: GeneralStatusCssNamespace.IGeneralStatusCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GeneralStatusCssNamespace.IGeneralStatusCss;
};

export = GeneralStatusCssModule;
