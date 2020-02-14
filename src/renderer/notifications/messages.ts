import { message } from 'antd';
import { globalConst } from '../constants/globals';
import { MessageType } from 'antd/lib/message';

/**
 * success message which tells that the update of yt-dl.exe was complete
 */
const downloadUpdateComplete = (): MessageType =>
  message.success('Update complete!', globalConst.MESSAGE_DURATION);

/**
 * Success message which tells that the download of the files has started
 */
const downloadStarted = (): MessageType =>
  message.success('Download started!', globalConst.MESSAGE_DURATION);

/**
 * Info message which tells the user to select a folder where to save the files
 * in case the user skiped this step
 */
const selectFolder = (): MessageType =>
  message.info('Please select a folder', globalConst.MESSAGE_DURATION);

/**
 * Info message which tells the uer to enter an url the url input is empty
 */
const enterUrl = (): MessageType =>
  message.info('Please enter an url', globalConst.MESSAGE_DURATION);

/**
 * Warning message which tells the user to enter a valid youtube url in
 * case the entered url is a wrong url
 */
const youtubeUrl = (): MessageType =>
  message.warning('Please enter a valid youtube url', globalConst.MESSAGE_DURATION);

export default {
  downloadUpdateComplete,
  downloadStarted,
  selectFolder,
  enterUrl,
  youtubeUrl
};
