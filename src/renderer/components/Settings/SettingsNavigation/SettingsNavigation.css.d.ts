declare namespace SettingsNavigationCssNamespace {
  export interface ISettingsNavigationCss {
    menuContainer: string;
  }
}

declare const SettingsNavigationCssModule: SettingsNavigationCssNamespace.ISettingsNavigationCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsNavigationCssNamespace.ISettingsNavigationCss;
};

export = SettingsNavigationCssModule;
