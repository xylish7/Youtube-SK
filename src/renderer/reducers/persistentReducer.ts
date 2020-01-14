import { Reducer } from 'redux';

import { EPersistent, PersistentAction } from '../actions/persistentAction';
import updateObject from '../utils/update-object';

export interface IPersistentState {
  readonly downloadSavePath: string;
}

const defaultState: IPersistentState = {
  downloadSavePath: ''
};

export const persistentReducer: Reducer<IPersistentState, PersistentAction> = (
  state: IPersistentState = defaultState,
  action: PersistentAction
): IPersistentState => {
  switch (action.type) {
    case EPersistent.CHANGE_DOWNLOAD_SAVE_PATH:
      return updateObject(state, { downloadSavePath: action.savePath });
    case EPersistent.GET_PERSISTEN_DATA:
      return updateObject(state, {
        downloadSavePath: action.persistentData.downloadSavePath
      });
    default:
      return state;
  }
};
