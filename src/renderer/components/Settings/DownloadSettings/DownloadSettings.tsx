import React from 'react';

import { Typography, Divider, Icon, Select } from 'antd';
import { FaVideo, FaVolumeUp } from 'react-icons/fa';
import {
  IAudioFormat,
  IAudioQuality,
  IVideoQuality,
  IVideoFormat,
  EUserPrefStore
} from '../../../constants/persistent-data-store';
const { Title, Text, Paragraph } = Typography;

import styles from './DownloadSettings.css';

import { PropsFromRedux } from '../../../containers/DownloadSettingsContainer';

type Props = PropsFromRedux;

const DownloadSettings: React.FC<Props> = (props: Props) => {
  const { appColor, downloadSettings, setPersistentDownloadData } = props;

  return (
    <React.Fragment>
      {/* AUDIO SETTINGS */}
      <Title level={4}>
        <Icon component={FaVolumeUp} style={{ color: appColor }} /> Audio
      </Title>
      {/* AUDIO QUALITY SETTING */}
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
            defaultValue={downloadSettings.audioQuality}
            value={downloadSettings.audioQuality}
            style={{ width: 100 }}
            onChange={(value: IAudioQuality) =>
              setPersistentDownloadData(
                {
                  settings: {
                    audioQuality: value
                  }
                },
                { [EUserPrefStore.DOWNLOAD_AUDIO_QUALITY]: value }
              )
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
        {/* AUDIO FORMAT SETTING */}
        <div>
          <Text style={{ color: appColor }}>Format </Text>
          <Select
            defaultValue={downloadSettings.audioFormat}
            value={downloadSettings.audioFormat}
            style={{ width: 100 }}
            onChange={(value: IAudioFormat) =>
              setPersistentDownloadData(
                { settings: { audioFormat: value } },
                { [EUserPrefStore.DOWNLOAD_AUDIO_FORMAT]: value }
              )
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

      {/* VIDEO SETTINGS */}
      <Title level={4}>
        <Icon component={FaVideo} style={{ color: appColor }} /> Video
      </Title>
      {/* VIDEO QUALITY SETTING */}
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
            defaultValue={downloadSettings.videoQuality}
            value={downloadSettings.videoQuality}
            style={{ width: 100 }}
            onChange={(value: IVideoQuality) =>
              setPersistentDownloadData(
                { settings: { videoQuality: value } },
                { [EUserPrefStore.DOWNLOAD_VIDEO_QUALITY]: value }
              )
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
        {/* VIDEO FORMAT SETTING */}
        <div>
          <Text style={{ color: appColor }}>Format </Text>
          <Select
            defaultValue={downloadSettings.videoFormat}
            value={downloadSettings.videoFormat}
            style={{ width: 100 }}
            onChange={(value: IVideoFormat) =>
              setPersistentDownloadData(
                {
                  settings: {
                    videoFormat: value
                  }
                },
                { [EUserPrefStore.DOWNLOAD_VIDEO_FORMAT]: value }
              )
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
