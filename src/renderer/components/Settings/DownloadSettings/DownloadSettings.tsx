import React from 'react';

import { Typography, Divider, Icon, Select } from 'antd';
import { FaVideo, FaVolumeUp } from 'react-icons/fa';
import {
  EAppColor,
  IChangedValues,
  IAudioFormat,
  IAudioQuality,
  IVideoQuality,
  IVideoFormat
} from '../../../constants/persistent-data-store';
const { Title, Text, Paragraph } = Typography;

import styles from './DownloadSettings.css';

type Props = {
  appColor: EAppColor;
  downloadSettings: {
    downloadAudioQuality: IAudioQuality;
    downloadAudioFormat: IAudioFormat;
    downloadVideoQuality: IVideoQuality;
    downloadVideoFormat: IVideoFormat;
  };
  changePersistentValues: (changedValues: IChangedValues) => void;
};

const DownloadSettings: React.FC<Props> = (props: Props) => {
  const { appColor, downloadSettings, changePersistentValues } = props;

  return (
    <React.Fragment>
      <Title level={4}>
        <Icon component={FaVolumeUp} style={{ color: appColor }} /> Audio
      </Title>
      <Paragraph>
        Change the audio quality and format of the downloaded file. <Text strong>best</Text> it's
        the recommended value for a good <Text strong>quality/size ratio and faster download</Text>.
        Increasing the quality will also increase the file size. If the quality is not present on
        youtube, the files needs aditional conversion which will take more time.
      </Paragraph>
      <div className={styles.optionsContainer}>
        <div>
          <Text style={{ color: appColor }}>Quality </Text>
          <Select
            defaultValue={downloadSettings.downloadAudioQuality}
            value={downloadSettings.downloadAudioQuality}
            style={{ width: 100 }}
            onChange={(value: IAudioQuality) =>
              changePersistentValues({ downloadAudioQuality: value })
            }
          >
            <Select.Option value="best">best</Select.Option>
            <Select.Option value="64">64 kbps</Select.Option>
            <Select.Option value="80">80 kbps</Select.Option>
            <Select.Option value="96">96 kbps</Select.Option>
            <Select.Option value="128">128 kbps</Select.Option>
            <Select.Option value="160">160 kbps</Select.Option>
            <Select.Option value="192">192 kbps</Select.Option>
            <Select.Option value="224">224 kbps</Select.Option>
            <Select.Option value="256">256 kbps</Select.Option>
            <Select.Option value="320">320 kbps</Select.Option>
          </Select>
        </div>
        <div>
          <Text style={{ color: appColor }}>Format </Text>
          <Select
            defaultValue={downloadSettings.downloadAudioFormat}
            value={downloadSettings.downloadAudioFormat}
            style={{ width: 100 }}
            onChange={(value: IAudioFormat) =>
              changePersistentValues({ downloadAudioFormat: value })
            }
          >
            <Select.Option value="mp3">mp3</Select.Option>
            <Select.Option value="m4a">m4a</Select.Option>
            <Select.Option value="ogg">ogg</Select.Option>
            <Select.Option value="wma">wma</Select.Option>
          </Select>
        </div>
      </div>
      <Divider />
      <Title level={4}>
        <Icon component={FaVideo} style={{ color: appColor }} /> Video
      </Title>
      <Paragraph>
        Change the video quality and format of the downloaded file. <Text strong>best</Text> it's
        the recommended value for a good <Text strong>quality/size ratio and faster download</Text>.
        Increasing the quality will also increase the file size.For resolutions bigger than 720p the
        download will take longer beacuse it needs to download both video and audio and merge them
        into a single file.
      </Paragraph>
      <div className={styles.optionsContainer}>
        <div>
          <Text style={{ color: appColor }}>Quality </Text>
          <Select
            defaultValue={downloadSettings.downloadVideoQuality}
            value={downloadSettings.downloadVideoQuality}
            style={{ width: 100 }}
            onChange={(value: IVideoQuality) =>
              changePersistentValues({ downloadVideoQuality: value })
            }
          >
            <Select.Option value="best">best</Select.Option>
            <Select.Option value="144">144p</Select.Option>
            <Select.Option value="240">240p</Select.Option>
            <Select.Option value="360">360p</Select.Option>
            <Select.Option value="480">480p</Select.Option>
            <Select.Option value="720">
              720p <sup style={{ color: appColor }}>HD</sup>
            </Select.Option>
            <Select.Option value="1080">
              1080p <sup style={{ color: appColor }}>HD</sup>
            </Select.Option>
            <Select.Option value="1440">
              1440p <sup style={{ color: appColor }}>HD</sup>
            </Select.Option>
            <Select.Option value="2160">
              2160p <sup style={{ color: appColor }}>4K</sup>
            </Select.Option>
          </Select>
        </div>
        <div>
          <Text style={{ color: appColor }}>Format </Text>
          <Select
            defaultValue={downloadSettings.downloadVideoFormat}
            value={downloadSettings.downloadVideoFormat}
            style={{ width: 100 }}
            onChange={(value: IVideoFormat) =>
              changePersistentValues({ downloadVideoFormat: value })
            }
          >
            <Select.Option value="mp4">mp4</Select.Option>
            <Select.Option value="webm">webm</Select.Option>
            <Select.Option value="3gp">3gp</Select.Option>
          </Select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DownloadSettings;
