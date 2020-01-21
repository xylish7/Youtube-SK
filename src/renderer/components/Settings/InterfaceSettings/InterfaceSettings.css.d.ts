declare namespace InterfaceSettingsCssModule {
  export interface IInterfaceSettingsCss {
    colorPaletteContainer: string;
  }
}

declare const InterfaceSettingsCssModule: InterfaceSettingsCssModule.IInterfaceSettingsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InterfaceSettingsCssModule.IInterfaceSettingsCss;
};

export = InterfaceSettingsCssModule;
