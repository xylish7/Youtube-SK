import { PersistentAction } from './persistentAction';
import { IDownloadAction } from './downloadAction';
import { IRouteAction } from './routesAction';

export type RootActions =
  | PersistentAction[keyof PersistentAction]
  | IDownloadAction[keyof IDownloadAction]
  | IRouteAction[keyof IRouteAction];
