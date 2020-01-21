declare namespace ChangeColorButtonCssModule {
  export interface IChangeColorButtonCss {
    buttonContainer: string;
    ripple: string;
  }
}

declare const ChangeColorButtonCssModule: ChangeColorButtonCssModule.IChangeColorButtonCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChangeColorButtonCssModule.IChangeColorButtonCss;
};

export = ChangeColorButtonCssModule;
