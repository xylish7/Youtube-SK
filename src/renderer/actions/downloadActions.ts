import { Action, ActionCreator } from 'redux';
import LocalStore from '../utils/local-store';
import { USER_PREFERENCES } from '../constants/persistent-data-store';

export enum DownloadType {
  CHANGE_SAVE_PATH = 'CHANGE_SAVE_PATH'
}

export interface ChangePathAction extends Action {
  type: DownloadType.CHANGE_SAVE_PATH;
  savePath: string;
}

/**
 * Change the location where the files will be saved
 *
 * @param {string} savePath
 */
export const changeSavePath: ActionCreator<ChangePathAction> = (
  savePath: string
): ChangePathAction => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  // Save download path to local store
  userPrefStore.set(USER_PREFERENCES.valuesNames.downloadSavePath, savePath);

  return {
    type: DownloadType.CHANGE_SAVE_PATH,
    savePath
  };
};

export type DownloadAction = ChangePathAction;
