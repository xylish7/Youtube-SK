import { Reducer } from 'redux';

import { EPersistent, PersistentAction } from '../actions/persistentAction';
import updateObject from '../utils/update-object';
import {
  ThemeMode,
  EAppColor,
  IAudioQuality,
  IAudioFormat,
  IVideoQuality,
  IVideoFormat
} from '../constants/persistent-data-store';

export interface IPersistentState {
  readonly downloadSavePath: string;
  readonly themeMode: ThemeMode;
  readonly appColor: EAppColor;
  readonly downloadAudioQuality: IAudioQuality;
  readonly downloadAudioFormat: IAudioFormat;
  readonly downloadVideoQuality: IVideoQuality;
  readonly downloadVideoFormat: IVideoFormat;
}

const defaultState: IPersistentState = {
  downloadSavePath: '',
  themeMode: ThemeMode.LIGHT,
  appColor: EAppColor.BLUE,
  downloadAudioQuality: 'best',
  downloadAudioFormat: 'mp3',
  downloadVideoQuality: 'best',
  downloadVideoFormat: 'mp4'
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
