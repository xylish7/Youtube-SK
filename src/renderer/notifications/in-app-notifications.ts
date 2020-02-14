import { notification } from 'antd';
import { globalConst } from '../constants/globals';

/**
 * Show a notification which tells that the app encountered
 * an error while trying to download a file
 * @param errorMessage the message to be displayed on error
 */
const downloadError = (errorMessage: string): void => {
  notification['error']({
    message: 'Download error',
    description: errorMessage,
    placement: globalConst.NOTIFICATION_PLACEMENT,
    duration: globalConst.NOTIFICATION_DURATION
  });
};

export default {
  download: {
    downloadError
  }
};
