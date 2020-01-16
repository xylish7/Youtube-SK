declare namespace SettingsCssModule {
  export interface ISettingsCss {
    closeButton: string;
    layout: string;
    settingsContent: string;
  }
}

declare const SettingsCssModule: SettingsCssModule.ISettingsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsCssModule.ISettingsCss;
};

export = SettingsCssModule;
