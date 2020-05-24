declare namespace FeaturesCssNamespace {
  export interface IFeaturesCss {
    container: string;
  }
}

declare const FeaturesCssModule: FeaturesCssNamespace.IFeaturesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FeaturesCssNamespace.IFeaturesCss;
};

export = FeaturesCssModule;
