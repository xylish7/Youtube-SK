declare namespace InterfaceSettingsCssNamespace {
  export interface IInterfaceSettingsCss {
    colorPaletteContainer: string;
  }
}

declare const InterfaceSettingsCssModule: InterfaceSettingsCssNamespace.IInterfaceSettingsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InterfaceSettingsCssNamespace.IInterfaceSettingsCss;
};

export = InterfaceSettingsCssModule;
