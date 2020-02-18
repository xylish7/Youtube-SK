import React from 'react';

import { Typography, Tag, Card, Progress, List, Spin, Result, Icon } from 'antd';
const { Text } = Typography;

import styles from './DownloadList.css';
import { EDownloadStatus } from '../../../../../reducers/downloadReducer';

import { PropsFromRedux } from '../../../../../containers/DownloadListContainer';

type Props = PropsFromRedux & {
  downloadStatus: EDownloadStatus;
};

const DownloadList: React.FC<Props> = (props: Props) => {
  const { downloadStatus, mediaFiles, filesProgress, appColor } = props;

  /**
   * Render the list of the files whih are being downloaded
   */
  const _renderDownloadList = (): JSX.Element => (
    <React.Fragment>
      {/* PROGRESS LIST HEADER */}
      <div className={styles.listTitlebar}>
        {/* STATUS TEXT */}
        <Text className={styles.listTitlebarStatus} strong>
          Status
        </Text>
        {/* TITLE TEXT */}
        <Text strong>Title</Text>
        <div className={styles.titleProgressSpacer} />
        {/* PROGRESS TEXT */}
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
                          // Show a tag with done when the download of the file is finished
                          <Tag>Done</Tag>
                        ) : (
                          // Show a spinner if the file is being downloaded
                          <Spin className={styles.listLoadingSpinner} />
                        )}
                      </div>
                    }
                    title={item.title}
                    description={item.duration}
                  />
                  {/* DOWNLOAD PROGRESS OF THE FILE */}
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

  /**
   * Render component with the message which tells that
   * the download can start
   */
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

  /**
   * Render component which tells that the app is checking if
   * yt-dl.exe has any updates
   */
  const _renderCheckUpdates = (): JSX.Element => (
    <Result
      className={styles.resultContainer}
      icon={<Icon type="smile" theme="twoTone" twoToneColor={appColor} />}
      title="You should be able to start downloading in a blink of an eye"
    />
  );

  /**
   * Render component which tells a messages that the app encountered
   * an error while trying to download the files
   */
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
      return _renderStartDownload();
  }
};

export default DownloadList;
