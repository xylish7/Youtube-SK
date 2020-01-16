import { Reducer } from 'redux';

import { EPersistent, PersistentAction } from '../actions/persistentAction';
import updateObject from '../utils/update-object';
import { ThemeMode } from '../constants/persistent-data-store';

export interface IPersistentState {
  readonly downloadSavePath: string;
  readonly themeMode: string;
}

const defaultState: IPersistentState = {
  downloadSavePath: '',
  themeMode: ThemeMode.LIGHT
};

export const persistentReducer: Reducer<IPersistentState, PersistentAction> = (
  state: IPersistentState = defaultState,
  action: PersistentAction
): IPersistentState => {
  switch (action.type) {
    case EPersistent.CHANGE_PERSISTENT_VALUES:
      return updateObject(state, { ...action.changedValuesObj });
    case EPersistent.GET_PERSISTENT_DATA:
      return updateObject(state, { ...action.persistentData });
    default:
      return state;
  }
};
