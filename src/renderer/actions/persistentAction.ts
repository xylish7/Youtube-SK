import { Action, ActionCreator } from 'redux';
import LocalStore from '../utils/local-store';
import { USER_PREFERENCES } from '../constants/persistent-data-store';

export enum EPersistent {
  GET_PERSISTEN_DATA = 'GET_PERSISTEN_DATA',
  CHANGE_DOWNLOAD_SAVE_PATH = 'CHANGE_DOWNLOAD_SAVE_PATH'
}

export interface IGetPersistentData extends Action {
  type: EPersistent.GET_PERSISTEN_DATA;
  persistentData: {
    downloadSavePath: string;
  };
}

export interface IChangeDownloadSavePath extends Action {
  type: EPersistent.CHANGE_DOWNLOAD_SAVE_PATH;
  savePath: string;
}

/**
 * Get persistent data from local store
 */

export const getPersistentData: ActionCreator<IGetPersistentData> = (): IGetPersistentData => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  const downloadSavePath = userPrefStore.get(USER_PREFERENCES.valuesNames.downloadSavePath);

  return {
    type: EPersistent.GET_PERSISTEN_DATA,
    persistentData: {
      downloadSavePath: downloadSavePath ? downloadSavePath : ''
    }
  };
};

/**
 * Change the location where the files to be downloaded
 *  will be saved
 *
 * @param {string} savePath
 */
export const changeDownloadSavePath: ActionCreator<IChangeDownloadSavePath> = (
  savePath: string
): IChangeDownloadSavePath => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  // Save download path to local store
  userPrefStore.set(USER_PREFERENCES.valuesNames.downloadSavePath, savePath);

  return {
    type: EPersistent.CHANGE_DOWNLOAD_SAVE_PATH,
    savePath
  };
};

export type PersistentAction = IChangeDownloadSavePath | IGetPersistentData;
