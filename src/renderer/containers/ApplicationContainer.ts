import { connect, ConnectedProps } from 'react-redux';

import Application from '../components/Application';
import { getAllPersistentData } from '../actions/persistentAction';
import { RootState } from '../reducers';
import {
  IChangeDownloadStatus,
  IUpdateMediaFile,
  changeDownloadStatus,
  updateMediaFiles,
  IUpdateFileProgress,
  updateFilesProgress,
  ISetDownloadInfo,
  setDownloadInfo,
  ISetDownloadedFileIndex,
  setDownloadedFileIndex,
} from '../actions/downloadAction';
import { EDownloadStatus } from '../reducers/downloadReducer';
import {
  IFileInfo,
  IFilesProgress,
  IDownloadInfo,
} from '../../shared/events-name/download-events-names';

const mapStateToProps = (state: RootState) => ({
  themeMode: state.generalSettings.themeMode,
  appColor: state.generalSettings.appColor,
  downloadStatus: state.download.status,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllPersistentData: () => dispatch(getAllPersistentData()),
  changeDownloadStatus: (downloadStatus: EDownloadStatus): IChangeDownloadStatus =>
    dispatch(changeDownloadStatus(downloadStatus)),
  updateMediaFiles: (mediaFile: Array<IFileInfo>): IUpdateMediaFile =>
    dispatch(updateMediaFiles(mediaFile)),
  updateFilesProgress: (filesProgress: IFilesProgress): IUpdateFileProgress =>
    dispatch(updateFilesProgress(filesProgress)),
  setDownloadInfo: (downloadInfo: IDownloadInfo): ISetDownloadInfo =>
    dispatch(setDownloadInfo(downloadInfo)),
  setDownloadedFileIndex: (downloadedFileIndex: number): ISetDownloadedFileIndex =>
    dispatch(setDownloadedFileIndex(downloadedFileIndex)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Application);
