import { Action, ActionCreator } from 'redux';
import LocalStore from '../utils/local-store';
import { USER_PREFERENCES } from '../constants/persistent-data-store';

export enum Persistent {
  CHANGE_DOWNLOAD_SAVE_PATH = 'CHANGE_DOWNLOAD_SAVE_PATH'
}

export interface ChangeDownloadSavePathAction extends Action {
  type: Persistent.CHANGE_DOWNLOAD_SAVE_PATH;
  savePath: string;
}

/**
 * Change the location where the files will be saved
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

export type PersistentAction = ChangeDownloadSavePathAction;
