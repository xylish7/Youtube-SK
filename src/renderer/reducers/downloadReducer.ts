import { Reducer } from 'redux';

import { DownloadType, DownloadAction } from '../actions/downloadActions';
import updateObject from '../utils/update-object';

export interface DownloadState {
  readonly savePath: string;
}

const defaultState: DownloadState = {
  savePath: ''
};

export const downloadReducer: Reducer<DownloadState, DownloadAction> = (
  state: DownloadState = defaultState,
  action: DownloadAction
): DownloadState => {
  switch (action.type) {
    case DownloadType.CHANGE_SAVE_PATH:
      return updateObject(state, { savePath: action.savePath });
    default:
      return state;
  }
};
