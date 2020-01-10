import { combineReducers } from 'redux';

import { PersistentState, downloadReducer } from './persistentReducer';

export interface RootState {
  persistent: PersistentState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  persistent: downloadReducer
});
