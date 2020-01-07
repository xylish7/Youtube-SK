declare namespace CounterCssModule {
  export interface ICounterCss {
    counter: string;
  }
}

declare const CounterCssModule: CounterCssModule.ICounterCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CounterCssModule.ICounterCss;
};

export = CounterCssModule;
