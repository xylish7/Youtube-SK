import { message } from 'antd';
import { globalConst } from '../constants/globals';
import { MessageType } from 'antd/lib/message';

const downloadUpdateComplete = (): MessageType =>
  message.success('Update complete!', globalConst.MESSAGE_DURATION);

const downloadStarted = (): MessageType =>
  message.success('Download started!', globalConst.MESSAGE_DURATION);

const selectFolder = (): MessageType =>
  message.info('Please select a folder', globalConst.MESSAGE_DURATION);

const enterUrl = (): MessageType =>
  message.info('Please enter an url', globalConst.MESSAGE_DURATION);

const youtubeUrl = (): MessageType =>
  message.warning('Please enter a valid youtube url', globalConst.MESSAGE_DURATION);

export default {
  downloadUpdateComplete,
  downloadStarted,
  selectFolder,
  enterUrl,
  youtubeUrl
};
