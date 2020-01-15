import { combineReducers } from 'redux';

import { IPersistentState, persistentReducer } from './persistentReducer';
import { IDownloadState, downloadReducer } from './downloadReducer';
import { IRouteState, routeReducer } from './routeReducer';

export interface RootState {
  persistent: IPersistentState;
  download: IDownloadState;
  route: IRouteState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  persistent: persistentReducer,
  download: downloadReducer,
  route: routeReducer
});
