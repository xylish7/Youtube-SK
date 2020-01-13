declare namespace SettingsNavigationCssModule {
  export interface ISettingsNavigationCss {
    menuContainer: string;
  }
}

declare const SettingsNavigationCssModule: SettingsNavigationCssModule.ISettingsNavigationCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsNavigationCssModule.ISettingsNavigationCss;
};

export = SettingsNavigationCssModule;
