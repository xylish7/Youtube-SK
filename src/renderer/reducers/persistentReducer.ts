import { Reducer } from 'redux';

import { Persistent, PersistentAction } from '../actions/persistentAction';
import updateObject from '../utils/update-object';

export interface PersistentState {
  readonly downloadSavePath: string;
}

const defaultState: PersistentState = {
  downloadSavePath: ''
};

export const downloadReducer: Reducer<PersistentState, PersistentAction> = (
  state: PersistentState = defaultState,
  action: PersistentAction
): PersistentState => {
  switch (action.type) {
    case Persistent.CHANGE_DOWNLOAD_SAVE_PATH:
      return updateObject(state, { downloadSavePath: action.savePath });
    case Persistent.GET_PERSISTEN_DATA:
      return updateObject(state, {
        downloadSavePath: action.persistentData.downloadSavePath
      });
    default:
      return state;
  }
};
