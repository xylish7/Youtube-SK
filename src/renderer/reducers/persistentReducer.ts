import { Reducer } from 'redux';

import { EPersistent, PersistentAction } from '../actions/persistentAction';
import updateObject from '../utils/update-object';
import { ThemeMode, EAppColor } from '../constants/persistent-data-store';

export interface IPersistentState {
  readonly downloadSavePath: string;
  readonly themeMode: ThemeMode;
  readonly appColor: EAppColor;
}

const defaultState: IPersistentState = {
  downloadSavePath: '',
  themeMode: ThemeMode.LIGHT,
  appColor: EAppColor.BLUE
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
