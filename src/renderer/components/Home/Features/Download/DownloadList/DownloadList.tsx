import React from 'react';

import { Typography, Tag, Card, Progress, List, Spin, Result, Icon } from 'antd';
const { Text } = Typography;

import styles from './DownloadList.css';
import { EDownloadStatus } from '../../../../../reducers/downloadReducer';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  },
  {
    title: 'Ant Design Title 1'
  }
  // {
  //   title: 'Ant Design Title 2'
  // },
  // {
  //   title: 'Ant Design Title 3'
  // },
  // {
  //   title: 'Ant Design Title 4'
  // }
];

type Props = {
  convertOpt?: boolean;
  downloadStatus: EDownloadStatus;
};

const DownloadList: React.FC<Props> = (props: Props) => {
  const { convertOpt, downloadStatus } = props;

  // Render the list of the downloaded videos
  const _renderDownloadList = (): JSX.Element => (
    <React.Fragment>
      <div className={styles.listTitlebar}>
        <Text className={styles.listTitlebarStatus} strong>
          Status
        </Text>
        <Text strong>Title</Text>
        <div style={{ width: convertOpt ? '371px' : '459px' }} />
        <Text strong>Download</Text>
        {convertOpt && (
          <Text className={styles.listTitlebarConvert} strong>
            Convert
          </Text>
        )}
      </div>

      <div className={styles.listContainer}>
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <div className={styles.listStatus}>
                      {item.title === 'Ant Design Title 3' ? (
                        <Tag color="orange">PENDING</Tag>
                      ) : (
                        <Spin className={styles.listLoadingSpinner} />
                      )}
                    </div>
                  }
                  title={item.title}
                  description="Ant Design, a design language "
                />
                <div className={styles.progressContainer}>
                  <div style={{ marginRight: convertOpt ? 72 : 26 }}>
                    <Progress type="circle" percent={0} width={30} />
                  </div>
                  {convertOpt && (
                    <div className={styles.convertProgress}>
                      <Progress type="circle" percent={0} width={30} />
                    </div>
                  )}
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </React.Fragment>
  );

  // Render component with the message to start the download
  const _renderStartDownload = (): JSX.Element => (
    <Result
      className={styles.resultContainer}
      icon={<Icon type="smile" theme="twoTone" />}
      title={
        downloadStatus === EDownloadStatus.FETCHING
          ? 'Your download should start soon. Please wait...'
          : 'Ready to download? Just press the button!'
      }
    />
  );

  // Render component with the message that the download failed
  const _renderDownloadFailed = (): JSX.Element => (
    <Result
      className={styles.resultContainer}
      icon={<Icon type="frown" theme="twoTone" />}
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
      return _renderDownloadFailed();

    default:
      return _renderDownloadList();
  }
};

export default DownloadList;
