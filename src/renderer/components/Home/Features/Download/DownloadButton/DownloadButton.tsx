import React from 'react';

import { Typography } from 'antd';
import { DownloadOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
const { Text } = Typography;

import { EDownloadStatus } from '../../../../../reducers/downloadReducer';
import { EAppColor } from '../../../../../constants/persistent-data-store';

type Props = {
  downloadStatus: EDownloadStatus;
  appColor: EAppColor;
};

const DownloadButton: React.FC<Props> = (props: Props) => {
  const { downloadStatus, appColor } = props;

  const _renderDownloadButtonText = (): JSX.Element => {
    switch (downloadStatus) {
      /**
       * Set the text of the button to 'Download' with a representative
       * icon if no download is in progress
       */
      case EDownloadStatus.WAITING:
      case EDownloadStatus.STOPPED:
        return (
          <React.Fragment>
            <DownloadOutlined style={{ marginRight: 8 }} /> Download
          </React.Fragment>
        );

      /**
       * Show a loading icon if the app is checking for yt-dl.exe updates
       * or if the app is fetching the required data to start the download
       */
      case EDownloadStatus.FETCHING:
      case EDownloadStatus.UPDATING:
        return <LoadingOutlined style={{ color: appColor }} />;

      /**
       * Set the text of the butotn to "Stop" with a representative icon if
       * the file is being downloaded
       **/
      case EDownloadStatus.DOWNLOADING:
        return (
          <React.Fragment>
            <CloseOutlined style={{ marginRight: 8 }} /> Stop
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <DownloadOutlined style={{ marginRight: 8 }} /> Download
          </React.Fragment>
        );
    }
  };

  return (
    <div style={{ width: 86, textAlign: 'center' }}>
      <Text style={{ color: 'white' }}>{_renderDownloadButtonText()}</Text>
    </div>
  );
};

export default DownloadButton;
