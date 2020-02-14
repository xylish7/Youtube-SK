import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

/**
 * Class used to serach for new releases of the app
 */
export default class AppUpdater {
  /**
   * Check if updates are available and if they are, download them
   */
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify().catch(err => console.log(err));
  }
}
