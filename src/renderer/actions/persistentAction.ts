import LocalStore from '../utils/local-store';
import {
  USER_PREFERENCES,
  EUserPrefStore,
  ThemeMode,
  EAppColor
} from '../constants/persistent-data-store';
import { setPersistentDownloadData } from './downloadAction';
import { AppThunk } from '../reducers';
import { setPersistentGeneralSettingsData } from './generalSettingsAction';

export enum EPersistent {
  GET_PERSISTENT_DATA = 'GET_PERSISTENT_DATA'
}

/**
 * Get all persistent data from local store
 */
export const getAllPersistentData = (): AppThunk => dispatch => {
  const userPrefStore: LocalStore = new LocalStore(USER_PREFERENCES.store);

  const themeMode = userPrefStore.get(EUserPrefStore.THEME_MODE);
  const appColor = userPrefStore.get(EUserPrefStore.APP_COLOR);
  const downloadSavePath = userPrefStore.get(EUserPrefStore.DOWNLOAD_SAVE_PATH);
  const downloadAudioQuality = userPrefStore.get(EUserPrefStore.DOWNLOAD_AUDIO_QUALITY);
  const downloadAudioFormat = userPrefStore.get(EUserPrefStore.DOWNLOAD_AUDIO_FORMAT);
  const downloadVideoQuality = userPrefStore.get(EUserPrefStore.DOWNLOAD_VIDEO_QUALITY);
  const downloadVideoFormat = userPrefStore.get(EUserPrefStore.DOWNLOAD_VIDEO_FORMAT);

  // Set general settings data
  dispatch(
    setPersistentGeneralSettingsData({
      themeMode: themeMode ? themeMode : ThemeMode.LIGHT,
      appColor: appColor ? appColor : EAppColor.BLUE
    })
  );

  // Set download persistent data
  dispatch(
    setPersistentDownloadData({
      savePath: downloadSavePath ? downloadSavePath : '',
      settings: {
        audioQuality: downloadAudioQuality ? downloadAudioQuality : 'best',
        audioFormat: downloadAudioFormat ? downloadAudioFormat : 'mp3',
        videoQuality: downloadVideoQuality ? downloadVideoQuality : 'best',
        videoFormat: downloadVideoFormat ? downloadVideoFormat : 'mp4'
      }
    })
  );
};
