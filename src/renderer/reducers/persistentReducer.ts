import { Reducer } from 'redux';

import { Persistent, PersistentAction } from '../actions/persistentAction';
import updateObject from '../utils/update-object';

export interface PersistentState {
  readonly savePath: string;
}

const defaultState: PersistentState = {
  savePath: ''
};

export const downloadReducer: Reducer<PersistentState, PersistentAction> = (
  state: PersistentState = defaultState,
  action: PersistentAction
): PersistentState => {
  switch (action.type) {
    case Persistent.CHANGE_DOWNLOAD_SAVE_PATH:
      return updateObject(state, { savePath: action.savePath });
    default:
      return state;
  }
};
