import React from 'react';

import { Typography, Icon } from 'antd';
const { Text } = Typography;

import { EDownloadStatus } from '../../../../../reducers/downloadReducer';

type Props = {
  downloadStatus: EDownloadStatus;
};

const DownloadButton: React.FC<Props> = (props: Props) => {
  const { downloadStatus } = props;

  const _renderDownloadButtonText = (): JSX.Element => {
    switch (downloadStatus) {
      case EDownloadStatus.WAITING:
      case EDownloadStatus.STOPPED:
        return (
          <React.Fragment>
            <Icon type="download" style={{ marginRight: 8 }} /> Download
          </React.Fragment>
        );

      case EDownloadStatus.FETCHING:
        return <Icon type="loading" style={{ color: '#1890ff' }} />;

      case EDownloadStatus.DOWNLOADING:
        return (
          <React.Fragment>
            <Icon type="close" style={{ marginRight: 8 }} /> Stop
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <Icon type="download" style={{ marginRight: 8 }} /> Download
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