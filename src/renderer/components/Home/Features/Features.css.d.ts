declare namespace FeaturesCssModule {
  export interface IFeaturesCss {
    container: string;
  }
}

declare const FeaturesCssModule: FeaturesCssModule.IFeaturesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FeaturesCssModule.IFeaturesCss;
};

export = FeaturesCssModule;
