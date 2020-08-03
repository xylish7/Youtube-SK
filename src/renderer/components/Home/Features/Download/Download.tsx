import React, { useState } from 'react';
import { remote, shell, OpenDialogReturnValue } from 'electron';
const { dialog } = remote;

import { Typography, Button, Input, Divider, Radio } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
const { Text } = Typography;
const { Search } = Input;
import { FaGlobe } from 'react-icons/fa';

import { startDownloadEvent, stopDownloadEvent } from '../../../../events/download-events';
import { EDownloadStatus } from '../../../../reducers/downloadReducer';
import messages from '../../../../notifications/messages';
import { EUserPrefStore } from '../../../../constants/persistent-data-store';

import DownloadListContainer from '../../../../containers/DownloadListContainer';
import GeneralStatus from './GeneralStatus/GeneralStatus';
import DownloadButton from './DownloadButton/DownloadButton';

import { regExpressions } from '../../../../constants/globals';
import styles from './Download.css';

import { PropsFromRedux } from '../../../../containers/DownloadContainer';
import Badge from '../../../Shared/Badge/Badge';

type Props = PropsFromRedux;

const Download: React.FC<Props> = (props: Props) => {
  const {
    savePath,
    downloadStatus,
    downloadType,
    downloadSettings,
    downloadInfo,
    downloadedFileIndex,
    appColor,
    setPersistentDownloadData,
    changeDownloadStatus,
    changeDownloadType,
    updateMediaFiles,
    updateFilesProgress,
    setDownloadedFileIndex,
  } = props;

  const [downloadUrl, setDownloadUrl] = useState<string>('');

  /**
   * Open a dialog to select the folder in which the files
   * will be saved
   */
  const getSavePath = async (): Promise<void> => {
    const path: OpenDialogReturnValue = await dialog.showOpenDialog({
      buttonLabel: 'Select folder',
      properties: ['openDirectory'],
    });

    if (path.filePaths.length)
      setPersistentDownloadData(
        { savePath: path.filePaths[0] },
        {
          [EUserPrefStore.DOWNLOAD_SAVE_PATH]: path.filePaths[0],
        }
      );
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
    changeDownloadType(downloadType);

    if (downloadStatus !== EDownloadStatus.WAITING && downloadStatus !== EDownloadStatus.UPDATING)
      changeDownloadStatus(EDownloadStatus.WAITING);
  };

  /**
   * Copy the url from clipboard to the download input
   */
  const copyUrlFromClipboard = async () => {
    const url: string = await navigator.clipboard.readText();

    setDownloadUrl(url);
  };

  /**
   * Handle the press of the download button
   */
  const handleDownloadButton = (): void => {
    updateFilesProgress({});
    setDownloadedFileIndex(0);

    if (downloadStatus !== EDownloadStatus.DOWNLOADING)
      if (isValid()) {
        updateMediaFiles([]);
        changeDownloadStatus(EDownloadStatus.FETCHING);
        startDownloadEvent(downloadUrl, { downloadSettings, downloadType });
      }

    if (downloadStatus === EDownloadStatus.DOWNLOADING) {
      changeDownloadStatus(EDownloadStatus.STOPPED);
      stopDownloadEvent();
    }
  };

  /**
   * Before download check different parameters to see if
   * their status is ok so that the download can start
   */
  const isValid = (): boolean => {
    const urlRegex = new RegExp(regExpressions.URL);

    if (savePath === '') {
      messages.selectFolder();
      return false;
    }

    if (downloadUrl === '') {
      messages.enterUrl();
      return false;
    }
    if (!urlRegex.test(downloadUrl.toString())) {
      messages.youtubeUrl();
      return false;
    }

    messages.downloadStarted();
    return true;
  };

  return (
    <div>
      <div className={styles.selectFolderContainer}>
        {/* SELECT FOLDER BUTTON */}
        <Button size="small" onClick={() => getSavePath()}>
          <FolderOutlined />
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
        <Radio.Group value={downloadType}>
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
            value={downloadUrl}
            prefix={<FaGlobe style={{ color: '#cccccc' }} />}
            disabled={
              downloadStatus === EDownloadStatus.FETCHING ||
              downloadStatus === EDownloadStatus.UPDATING
            }
            enterButton={
              <Badge
                color={appColor}
                showBadge={
                  downloadInfo.isPlaylist &&
                  (downloadStatus === EDownloadStatus.DOWNLOADING ||
                    downloadStatus === EDownloadStatus.DONE)
                }
                currentNumber={downloadedFileIndex}
                totalNumber={downloadInfo.nrOfEntries}
                style={{ right: -31, top: -15 }}
              >
                <DownloadButton downloadStatus={downloadStatus} appColor={appColor} />
              </Badge>
            }
            placeholder="Double click to paste the url"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setDownloadUrl(e.currentTarget.value)
            }
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
