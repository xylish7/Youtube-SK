import { Action, ActionCreator } from 'redux';
import LocalStore from '../utils/local-store';
import {
  USER_PREFERENCES,
  EUserPrefStore,
  IChangedValues,
  ThemeMode,
  EAppColor
} from '../constants/persistent-data-store';

export enum EPersistent {
  GET_PERSISTENT_DATA = 'GET_PERSISTENT_DATA',
  CHANGE_PERSISTENT_VALUES = 'CHANGE_PERSISTENT_VALUES'
}

export interface IGetPersistentData extends Action {
  type: EPersistent.GET_PERSISTENT_DATA;
  persistentData: {
    downloadSavePath: string;
    themeMode: string;
    appColor: string;
    downloadAudioQuality: string;
    downloadAudioFormat: string;
    downloadVideoQuality: string;
    downloadVideoFormat: string;
  };
}

export interface IChangePersistentValues extends Action {
  type: EPersistent.CHANGE_PERSISTENT_VALUES;
  changedValuesObj: IChangedValues;
}

/**
 * Get all persistent data from local store
 */

export const getAllPersistentData: ActionCreator<IGetPersistentData> = (): IGetPersistentData => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  const downloadSavePath = userPrefStore.get(EUserPrefStore.DOWNLOAD_SAVE_PATH);
  const themeMode = userPrefStore.get(EUserPrefStore.THEME_MODE);
  const appColor = userPrefStore.get(EUserPrefStore.APP_COLOR);
  const downloadAudioQuality = userPrefStore.get(EUserPrefStore.DOWNLOAD_AUDIO_QUALITY);
  const downloadAudioFormat = userPrefStore.get(EUserPrefStore.DOWNLOAD_AUDIO_FORMAT);
  const downloadVideoQuality = userPrefStore.get(EUserPrefStore.DOWNLOAD_VIDEO_QUALITY);
  const downloadVideoFormat = userPrefStore.get(EUserPrefStore.DOWNLOAD_VIDEO_FORMAT);

  return {
    type: EPersistent.GET_PERSISTENT_DATA,
    persistentData: {
      downloadSavePath: downloadSavePath ? downloadSavePath : '',
      themeMode: themeMode ? themeMode : ThemeMode.LIGHT,
      appColor: appColor ? appColor : EAppColor.BLUE,
      downloadAudioQuality: downloadAudioQuality ? downloadAudioQuality : 'best',
      downloadAudioFormat: downloadAudioFormat ? downloadAudioFormat : 'mp3',
      downloadVideoQuality: downloadVideoQuality ? downloadVideoQuality : 'best',
      downloadVideoFormat: downloadVideoFormat ? downloadVideoFormat : 'mp4'
    }
  };
};

/**
 * Change persistent data values
 *
 * @param {string} savePath
 */
export const changePersistentValues: ActionCreator<IChangePersistentValues> = (
  changedValuesObj: IChangedValues
): IChangePersistentValues => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  // Save download path to local store
  for (let [key, value] of Object.entries(changedValuesObj)) {
    userPrefStore.set(key, value);
  }

  return {
    type: EPersistent.CHANGE_PERSISTENT_VALUES,
    changedValuesObj
  };
};

export type PersistentAction = IChangePersistentValues | IGetPersistentData;
