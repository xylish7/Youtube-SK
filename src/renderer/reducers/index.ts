import { combineReducers } from 'redux';

import { IPersistentState, persistentReducer } from './persistentReducer';
import { IDownloadState, downloadReducer } from './downloadReducer';

export interface RootState {
  persistent: IPersistentState;
  download: IDownloadState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  persistent: persistentReducer,
  download: downloadReducer
});
