import { combineReducers, Action } from 'redux';

import { IDownloadState, downloadReducer } from './downloadReducer';
import { IRouteState, routeReducer } from './routeReducer';
import { ThunkAction } from 'redux-thunk';
import { IGeneralSettingsState, generalSettingsReducer } from './generalSettingsReducer';

export interface RootState {
  generalSettings: IGeneralSettingsState;
  download: IDownloadState;
  route: IRouteState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const rootReducer = combineReducers<RootState | undefined>({
  generalSettings: generalSettingsReducer,
  download: downloadReducer,
  route: routeReducer
});
