import React from 'react';

import { Typography, Tag } from 'antd';
const { Text } = Typography;

import { EDownloadStatus } from '../../../../../reducers/downloadReducer';
import { EAppColor } from '../../../../../constants/persistent-data-store';

import styles from './GeneralStatus.css';

type Props = {
  downloadStatus: EDownloadStatus;
  appColor: EAppColor;
};

const GeneralStatus: React.FC<Props> = (props: Props) => {
  const { downloadStatus, appColor } = props;

  /**
   * Return the text which should be rendered in the tag component
   * taking in consideration the [downloadStatus]
   */
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
      case EDownloadStatus.ERROR:
        return 'Error encountered';
      case EDownloadStatus.UPDATING:
        return 'Checking for updates...';
      default:
        return 'Waiting to start';
    }
  };

  // Set the tag color whenever the app color is changed from the settings
  let tagColor: string = 'blue';
  switch (appColor) {
    case EAppColor.BLUE:
      tagColor = 'blue';
      break;
    case EAppColor.TURQUOISE:
      tagColor = 'cyan';
      break;
    case EAppColor.RED:
      tagColor = 'red';
      break;
    default:
      break;
  }

  return (
    <div className={styles.generalStatus}>
      <Text strong>General status:</Text>
      <Tag className={styles.tag} color={tagColor}>
        {_renderGeneralStatusText()}
      </Tag>
    </div>
  );
};

export default GeneralStatus;
