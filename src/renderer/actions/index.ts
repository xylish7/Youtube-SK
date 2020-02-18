import { IDownloadAction } from './downloadAction';
import { IRouteAction } from './routesAction';

export type RootActions = IDownloadAction[keyof IDownloadAction] | IRouteAction[keyof IRouteAction];
