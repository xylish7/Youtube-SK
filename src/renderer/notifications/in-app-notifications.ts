import { notification } from 'antd';
import { globalConst } from '../constants/globals';

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
