declare namespace ChangeColorButtonCssNamespace {
  export interface IChangeColorButtonCss {
    buttonContainer: string;
    ripple: string;
  }
}

declare const ChangeColorButtonCssModule: ChangeColorButtonCssNamespace.IChangeColorButtonCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChangeColorButtonCssNamespace.IChangeColorButtonCss;
};

export = ChangeColorButtonCssModule;
