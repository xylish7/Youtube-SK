const appIcon = require('../../../assets/youtube-sk-72X72.png');

const downloadFinished = (): void => {
  new Notification('Youtube-SK', {
    body: 'Download Finished!',
    icon: appIcon
  });
};

const downloadError = (): void => {
  new Notification('Youtube-SK', {
    body: 'An error was encountered while trying to download your files',
    icon: appIcon
  });
};

export default {
  download: {
    downloadFinished,
    downloadError
  }
};
