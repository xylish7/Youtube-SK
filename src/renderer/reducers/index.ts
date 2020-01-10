import { combineReducers } from 'redux';

import { CounterState, counterReducer } from './counterReducer';
import { DownloadState, downloadReducer } from './downloadReducer';

export interface RootState {
  counter: CounterState;
  download: DownloadState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  counter: counterReducer,
  download: downloadReducer
});
