import React from 'react';

import { Typography, Tag, Card, Progress, List, Spin, Result, Icon } from 'antd';
const { Text } = Typography;

import styles from './DownloadList.css';
import { EDownloadStatus } from '../../../../../reducers/downloadReducer';
import { IFileInfo } from '../../../../../../shared/events-name/download-events-names';
import { EAppColor } from '../../../../../constants/persistent-data-store';

type Props = {
  downloadStatus: EDownloadStatus;
  mediaFiles: Array<IFileInfo>;
  filesProgress: any;
  appColor: EAppColor;
};

const DownloadList: React.FC<Props> = (props: Props) => {
  const { downloadStatus, mediaFiles, filesProgress, appColor } = props;

  // Render the list of the downloaded videos
  const _renderDownloadList = (): JSX.Element => (
    <React.Fragment>
      <div className={styles.listTitlebar}>
        <Text className={styles.listTitlebarStatus} strong>
          Status
        </Text>
        <Text strong>Title</Text>
        <div className={styles.titleProgressSpacer} />
        <Text strong>Progress</Text>
      </div>

      <div className={styles.listContainer}>
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={mediaFiles}
            renderItem={item => {
              const fileProgress = item.entry_nr ? filesProgress[item.entry_nr] : 0;

              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className={styles.listStatus}>
                        {fileProgress === 100 ? (
                          <Tag>Done</Tag>
                        ) : (
                          <Spin className={styles.listLoadingSpinner} />
                        )}
                      </div>
                    }
                    title={item.title}
                    description={item.duration}
                  />
                  <div className={styles.progressContainer}>
                    <Progress type="circle" percent={fileProgress} width={40} />
                  </div>
                </List.Item>
              );
            }}
          />
        </Card>
      </div>
    </React.Fragment>
  );

  // Render component with the message to start the download
  const _renderStartDownload = (): JSX.Element => (
    <Result
      className={styles.resultContainer}
      icon={<Icon type="smile" theme="twoTone" twoToneColor={appColor} />}
      title={
        downloadStatus === EDownloadStatus.FETCHING
          ? 'Your download should start soon. Please wait...'
          : 'Ready to download? Just press the button!'
      }
    />
  );

  // Render component which tells that the app checks for updates
  const _renderCheckUpdates = (): JSX.Element => (
    <Result
      className={styles.resultContainer}
      icon={<Icon type="smile" theme="twoTone" twoToneColor={appColor} />}
      title="You should be able to start downloading in a blink of an eye"
    />
  );

  // Render component with the message that the download failed
  const _renderDownloadFailed = (): JSX.Element => (
    <Result
      className={styles.resultContainer}
      icon={<Icon type="frown" theme="twoTone" twoToneColor={appColor} />}
      status="error"
      title="Oops! It seems like your download has stopped"
    ></Result>
  );

  switch (downloadStatus) {
    case EDownloadStatus.DOWNLOADING:
    case EDownloadStatus.DONE:
      return _renderDownloadList();

    case EDownloadStatus.FETCHING:
    case EDownloadStatus.WAITING:
      return _renderStartDownload();

    case EDownloadStatus.STOPPED:
    case EDownloadStatus.ERROR:
      return _renderDownloadFailed();

    case EDownloadStatus.UPDATING:
      return _renderCheckUpdates();

    default:
      return _renderDownloadList();
  }
};

export default DownloadList;
