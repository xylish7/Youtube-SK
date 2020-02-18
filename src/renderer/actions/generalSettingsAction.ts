import { Action, ActionCreator } from 'redux';
import {
  ThemeMode,
  EAppColor,
  IChangedValues,
  USER_PREFERENCES
} from '../constants/persistent-data-store';
import isEmpty from '../utils/is-empty';
import LocalStore from '../utils/local-store';

export enum EGeneralSettings {
  SET_GENERAL_SETTINGS_PERSISTENT_DATA = 'SET_GENERAL_SETTINGS_PERSISTENT_DATA'
}

export type IGeneralSettingsPersistentData = {
  themeMode?: ThemeMode;
  appColor?: EAppColor;
};

export interface ISetGeneralSettingsPersistentData extends Action {
  type: EGeneralSettings.SET_GENERAL_SETTINGS_PERSISTENT_DATA;
  persistentData: IGeneralSettingsPersistentData;
}

export const setPersistentGeneralSettingsData: ActionCreator<ISetGeneralSettingsPersistentData> = (
  persistentData: IGeneralSettingsPersistentData,
  changedValues: IChangedValues
) => {
  if (!isEmpty(changedValues)) LocalStore.setValues(USER_PREFERENCES.store, changedValues);

  return {
    type: EGeneralSettings.SET_GENERAL_SETTINGS_PERSISTENT_DATA,
    persistentData
  };
};

export type GeneralSettingsAction = ISetGeneralSettingsPersistentData;
