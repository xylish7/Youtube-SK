declare namespace SettingsCssNamespace {
  export interface ISettingsCss {
    closeButton: string;
    layout: string;
    settingsContent: string;
  }
}

declare const SettingsCssModule: SettingsCssNamespace.ISettingsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsCssNamespace.ISettingsCss;
};

export = SettingsCssModule;
