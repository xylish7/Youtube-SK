import { Reducer } from 'redux';

import updateObject from '../utils/update-object';
import { ThemeMode, EAppColor } from '../constants/persistent-data-store';
import { GeneralSettingsAction, EGeneralSettings } from '../actions/generalSettingsAction';

export interface IGeneralSettingsState {
  readonly themeMode: ThemeMode;
  readonly appColor: EAppColor;
}

const defaultState: IGeneralSettingsState = {
  themeMode: ThemeMode.LIGHT,
  appColor: EAppColor.BLUE
};

export const generalSettingsReducer: Reducer<IGeneralSettingsState, GeneralSettingsAction> = (
  state: IGeneralSettingsState = defaultState,
  action: GeneralSettingsAction
): IGeneralSettingsState => {
  switch (action.type) {
    case EGeneralSettings.SET_GENERAL_SETTINGS_PERSISTENT_DATA:
      return updateObject(state, { ...action.persistentData });

    default:
      return state;
  }
};
