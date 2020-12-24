const appIcon = require('../../../assets/youtube-sk-72X72.png');

/**
 * Nootification which tells the user that the download
 * was finished
 */
const downloadFinished = (): void => {
  new Notification('Youtube-SK', {
    body: 'Download Finished!',
    icon: appIcon,
  });
};

/**
 * Notification which tells the user the the app encountered a problem
 * while trying to download the files
 */
const downloadError = (): void => {
  new Notification('Youtube-SK', {
    body: 'An error was encountered while trying to download your files',
    icon: appIcon,
  });
};

/**
 * Notification which tells the user the the app encountered a problem
 * while trying to convert the files
 */
const convertError = (): void => {
  new Notification('Youtube-SK', {
    body: 'An error was encountered while trying to convert your files',
    icon: appIcon,
  });
};

export default {
  download: {
    downloadFinished,
    downloadError,
  },
  convert: {
    convertError,
  },
};
