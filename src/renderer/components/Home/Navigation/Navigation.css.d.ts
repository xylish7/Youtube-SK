declare namespace NavigationCssModule {
  export interface INavigationCss {
    container: string;
  }
}

declare const NavigationCssModule: NavigationCssModule.INavigationCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NavigationCssModule.INavigationCss;
};

export = NavigationCssModule;
