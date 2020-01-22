import React, { useState, useEffect } from 'react';
import { remote, shell, ipcRenderer, IpcMessageEvent } from 'electron';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
const { dialog } = remote;

import { Typography, Icon, Button, Input, Divider, message, Checkbox } from 'antd';
const { Text } = Typography;
const { Search } = Input;

import styles from './Download.css';
import { FaGlobe } from 'react-icons/fa';

import { regExpressions, globalConst } from '../../../../constants/globals';
import DownloadListContainer from '../../../../containers/DownloadListContainer';

import { startDownloadEvent } from '../../../../events/download-events';
import { EDownloadStatus, IDownloadOpts } from '../../../../reducers/downloadReducer';
import GeneralStatus from './GeneralStatus/GeneralStatus';
import DownloadButton from './DownloadButton/DownloadButton';
import {
  EDownloadEventsName,
  IDownloadInfo,
  IFileInfo,
  IFileProgress
} from '../../../../../shared/events-name/download-events-names';
import {
  EUserPrefStore,
  IChangedValues,
  EAppColor
} from '../../../../constants/persistent-data-store';

type Props = {
  savePath: string;
  downloadStatus: EDownloadStatus;
  downloadOpts: IDownloadOpts;
  appColor: EAppColor;
  changePersistentValues: (changedValues: IChangedValues) => void;
  changeDownloadStatus: (downloadStatus: EDownloadStatus) => void;
  changeDownloadOpts: (downloadOpts: IDownloadOpts) => void;
  updateMediaFiles: (mediaFile: Array<IFileInfo>) => void;
  updateFileProgress: (fileProgress: IFileProgress) => void;
};

const Download: React.FC<Props> = (props: Props) => {
  const {
    savePath,
    downloadStatus,
    downloadOpts,
    appColor,
    changePersistentValues,
    changeDownloadStatus,
    changeDownloadOpts,
    updateMediaFiles,
    updateFileProgress
  } = props;

  const [downloadInput, setDownloadInput] = useState<string>('');

  useEffect(() => {
    ipcRenderer.on(
      EDownloadEventsName.DOWNLOAD_PROGRESS,
      (event: IpcMessageEvent, fileProgress: IFileProgress) => {
        if (downloadStatus !== EDownloadStatus.DOWNLOADING)
          changeDownloadStatus(EDownloadStatus.DOWNLOADING);
        updateFileProgress(fileProgress);
      }
    );
    ipcRenderer.on(EDownloadEventsName.DOWNLOAD_FINISHED, () => {
      changeDownloadStatus(EDownloadStatus.DONE);
    });

    ipcRenderer.on(
      EDownloadEventsName.DOWNLOAD_INFO,
      (event: IpcMessageEvent, downloadInfo: IDownloadInfo) => {}
    );

    ipcRenderer.on(EDownloadEventsName.FILE_INFO, (event: IpcMessageEvent, fileInfo: IFileInfo) => {
      updateMediaFiles([fileInfo]);
    });

    return () => {
      ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_PROGRESS);
      ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_FINISHED);
      ipcRenderer.removeAllListeners(EDownloadEventsName.DOWNLOAD_INFO);
      ipcRenderer.removeAllListeners(EDownloadEventsName.FILE_INFO);
    };
  }, [downloadStatus]);

  /**
   * Open a dialog to select the folder in which the files
   * will be saved
   */
  const getSavePath = (): void => {
    const path: Array<string> = dialog.showOpenDialog({
      buttonLabel: 'Select folder',
      properties: ['openDirectory']
    });

    if (path)
      changePersistentValues({
        [EUserPrefStore.DOWNLOAD_SAVE_PATH]: path[0]
      });
  };

  /**
   * Open the folder wich coresponds to the [savePath]
   */
  const openSavePath = (): void => {
    shell.openItem(savePath);
  };

  /**
   * Handle convert to audio checkbox
   */
  const handleConvertCheckbox = (e: CheckboxChangeEvent) => {
    if (e.target.checked) changeDownloadOpts({ convert: true });
    else {
      changeDownloadOpts({ convert: false, audioAndVideo: false });
    }

    if (downloadStatus !== EDownloadStatus.WAITING) changeDownloadStatus(EDownloadStatus.WAITING);
  };

  /**
   * Handle save both audio and video checkbox
   */

  const handleAudioAndVideoCheckbox = (e: CheckboxChangeEvent) => {
    changeDownloadOpts({ audioAndVideo: e.target.checked });
    if (downloadStatus !== EDownloadStatus.WAITING) changeDownloadStatus(EDownloadStatus.WAITING);
  };

  /**
   * Copy the url from clipboard to the download input
   */
  const copyUrlFromClipboard = async () => {
    const url: string = await navigator.clipboard.readText();

    setDownloadInput(url);
  };

  /**
   * Handle the press of the downlaod button
   */
  const handleDownloadButton = (): void => {
    if (downloadStatus !== EDownloadStatus.DOWNLOADING)
      if (isValid()) {
        changeDownloadStatus(EDownloadStatus.FETCHING);
        updateMediaFiles([]);
        startDownloadEvent(downloadInput);
      }

    if (downloadStatus === EDownloadStatus.DOWNLOADING)
      changeDownloadStatus(EDownloadStatus.STOPPED);
  };

  /**
   * Before download check different parameters to see if
   * their status is ok so that the download can start
   */
  const isValid = (): boolean => {
    const urlRegex = new RegExp(regExpressions.URL);

    if (savePath === '') {
      message.warning('Please select a folder', globalConst.MESSAGE_DURATION);
      return false;
    }

    if (downloadInput === '') {
      message.warning('Please enter an url', globalConst.MESSAGE_DURATION);
      return false;
    }
    if (!urlRegex.test(downloadInput.toString())) {
      message.warning('Please enter a valid youtube url', globalConst.MESSAGE_DURATION);
      return false;
    }

    message.success('Download started!', globalConst.MESSAGE_DURATION);
    return true;
  };

  return (
    <div>
      <div className={styles.selectFolderContainer}>
        {/* SELECT FOLDER BUTTON */}
        <Button size="small" onClick={() => getSavePath()}>
          <Icon type="folder" />
        </Button>

        {/* SAVE PATH LINK TEXT */}
        {savePath !== '' ? (
          <Text className={styles.pathText}>
            <a onClick={openSavePath}>{savePath}</a>
          </Text>
        ) : (
          <Text className={styles.pathText}>
            Select the folder where you want to save the files
          </Text>
        )}
      </div>

      {/* CHECKBOX OPTIONS */}
      <div className={styles.options}>
        <Checkbox
          checked={downloadOpts.convert}
          disabled={
            downloadStatus === EDownloadStatus.DOWNLOADING ||
            downloadStatus === EDownloadStatus.FETCHING
          }
          onChange={e => handleConvertCheckbox(e)}
        >
          Convert to audio
        </Checkbox>
        <br />
        <Checkbox
          checked={downloadOpts.audioAndVideo}
          disabled={
            !downloadOpts.convert ||
            downloadStatus === EDownloadStatus.DOWNLOADING ||
            downloadStatus === EDownloadStatus.FETCHING
          }
          onChange={e => handleAudioAndVideoCheckbox(e)}
        >
          Save both video an audio
        </Checkbox>
      </div>

      <Divider />

      {/* GENERAL STATUS */}
      <div>
        <GeneralStatus downloadStatus={downloadStatus} appColor={appColor} />

        {/* INPUT CONTAINER */}
        <div className={styles.inputContainer}>
          <Search
            onSearch={handleDownloadButton}
            value={downloadInput}
            prefix={<Icon component={FaGlobe} style={{ color: '#cccccc' }} />}
            disabled={downloadStatus === EDownloadStatus.FETCHING}
            enterButton={<DownloadButton downloadStatus={downloadStatus} appColor={appColor} />}
            placeholder="Double click to paste the url"
            onChange={e => setDownloadInput(e.target.value)}
            onDoubleClick={copyUrlFromClipboard}
          />
        </div>
      </div>

      {/* 
      // @ts-ignore */}
      <DownloadListContainer
        convertOpt={downloadOpts.convert ? downloadOpts.convert : false}
        downloadStatus={downloadStatus}
      />
    </div>
  );
};

export default Download;
