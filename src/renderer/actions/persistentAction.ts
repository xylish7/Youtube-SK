import { Action, ActionCreator } from 'redux';
import LocalStore from '../utils/local-store';
import { USER_PREFERENCES } from '../constants/persistent-data-store';

export enum Persistent {
  GET_PERSISTEN_DATA = 'GET_PERSISTEN_DATA',
  CHANGE_DOWNLOAD_SAVE_PATH = 'CHANGE_DOWNLOAD_SAVE_PATH'
}

export interface GetPersistentData extends Action {
  type: Persistent.GET_PERSISTEN_DATA;
  persistentData: {
    downloadSavePath: string;
  };
}

export interface ChangeDownloadSavePathAction extends Action {
  type: Persistent.CHANGE_DOWNLOAD_SAVE_PATH;
  savePath: string;
}

/**
 * Get persistent data from local store
 */

export const getPersistentData: ActionCreator<GetPersistentData> = (): GetPersistentData => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  const downloadSavePath = userPrefStore.get(USER_PREFERENCES.valuesNames.downloadSavePath);

  return {
    type: Persistent.GET_PERSISTEN_DATA,
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
export const changeDownloadSavePath: ActionCreator<ChangeDownloadSavePathAction> = (
  savePath: string
): ChangeDownloadSavePathAction => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  // Save download path to local store
  userPrefStore.set(USER_PREFERENCES.valuesNames.downloadSavePath, savePath);

  return {
    type: Persistent.CHANGE_DOWNLOAD_SAVE_PATH,
    savePath
  };
};

export type PersistentAction = ChangeDownloadSavePathAction | GetPersistentData;
