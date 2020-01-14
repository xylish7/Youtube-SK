import React from 'react';

import { Typography, Tag } from 'antd';
const { Text } = Typography;

import { EDownloadStatus } from '../../../../../reducers/downloadReducer';

import styles from './GeneralStatus.css';

type Props = {
  downloadStatus: EDownloadStatus;
};
const GeneralStatus: React.FC<Props> = (props: Props) => {
  const { downloadStatus } = props;

  const _renderGeneralStatusText = (): string => {
    switch (downloadStatus) {
      case EDownloadStatus.WAITING:
        return 'Waiting to start';
      case EDownloadStatus.FETCHING:
        return 'Fetching data...';
      case EDownloadStatus.DOWNLOADING:
        return 'Downloading...';
      case EDownloadStatus.STOPPED:
        return 'Canceled';
      case EDownloadStatus.DONE:
        return 'Download complete';
      default:
        return 'Waiting to start';
    }
  };

  return (
    <div className={styles.generalStatus}>
      <Text strong>General status:</Text>
      <Tag className={styles.tag} color="blue">
        {_renderGeneralStatusText()}
      </Tag>
    </div>
  );
};

export default GeneralStatus;
