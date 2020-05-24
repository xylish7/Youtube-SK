declare namespace NavigationCssNamespace {
  export interface INavigationCss {
    container: string;
    icon: string;
    iconContainer: string;
    isActive: string;
    ripple: string;
  }
}

declare const NavigationCssModule: NavigationCssNamespace.INavigationCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NavigationCssNamespace.INavigationCss;
};

export = NavigationCssModule;
