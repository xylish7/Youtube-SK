declare namespace BadgeCssNamespace {
  export interface IBadgeCss {
    badge: string;
    badgeText: string;
  }
}

declare const BadgeCssModule: BadgeCssNamespace.IBadgeCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BadgeCssNamespace.IBadgeCss;
};

export = BadgeCssModule;
