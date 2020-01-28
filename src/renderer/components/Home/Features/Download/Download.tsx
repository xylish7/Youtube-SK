import React, { useState } from 'react';
import { remote, shell } from 'electron';
const { dialog } = remote;

import { Typography, Icon, Button, Input, Divider, message, Radio } from 'antd';
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
import { IFileInfo } from '../../../../../shared/events-name/download-events-names';
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
    updateMediaFiles
  } = props;

  const [downloadInput, setDownloadInput] = useState<string>('');

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
   * Handle radio button selection
   */
  const handleDownloadType = (downloadType: 'audio' | 'video') => {
    changeDownloadOpts({ downloadType });

    if (downloadStatus !== EDownloadStatus.WAITING && downloadStatus !== EDownloadStatus.UPDATING)
      changeDownloadStatus(EDownloadStatus.WAITING);
  };

  /**
   * Copy the url from clipboard to the download input
   */
  const copyUrlFromClipboard = async () => {
    const url: string = await navigator.clipboard.readText();

    setDownloadInput(url);
  };

  /**
   * Handle the press of the download button
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
      message.info('Please select a folder', globalConst.MESSAGE_DURATION);
      return false;
    }

    if (downloadInput === '') {
      message.info('Please enter an url', globalConst.MESSAGE_DURATION);
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
        <Text style={{ marginRight: 20 }}>Select which type of file do you want to download </Text>
        <Radio.Group value={downloadOpts.downloadType}>
          <Radio
            value="audio"
            disabled={
              downloadStatus === EDownloadStatus.DOWNLOADING ||
              downloadStatus === EDownloadStatus.FETCHING
            }
            onChange={() => handleDownloadType('audio')}
          >
            Audio
          </Radio>
          <Radio
            value="video"
            disabled={
              downloadStatus === EDownloadStatus.DOWNLOADING ||
              downloadStatus === EDownloadStatus.FETCHING
            }
            onChange={() => handleDownloadType('video')}
          >
            Video
          </Radio>
        </Radio.Group>
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
            disabled={
              downloadStatus === EDownloadStatus.FETCHING ||
              downloadStatus === EDownloadStatus.UPDATING
            }
            enterButton={<DownloadButton downloadStatus={downloadStatus} appColor={appColor} />}
            placeholder="Double click to paste the url"
            onChange={e => setDownloadInput(e.target.value)}
            onDoubleClick={copyUrlFromClipboard}
          />
        </div>
      </div>

      {/* 
      // @ts-ignore */}
      <DownloadListContainer downloadStatus={downloadStatus} />
    </div>
  );
};

export default Download;
