import { connect, ConnectedProps } from 'react-redux';

import Download from '../components/Home/Features/Download/Download';
import { RootState } from '../reducers';
import {
  IChangeDownloadStatus,
  changeDownloadStatus,
  IChangeDownloadOpts,
  changeDownloadType,
  IUpdateMediaFile,
  updateMediaFiles,
  setPersistentDownloadData,
  IDownloadPersistentData,
  IUpdateFileProgress,
  updateFilesProgress,
  setDownloadedFileIndex,
  ISetDownloadedFileIndex,
} from '../actions/downloadAction';
import { EDownloadStatus, IDownloadType } from '../reducers/downloadReducer';
import { IChangedValues } from '../constants/persistent-data-store';
import { IFileInfo, IFilesProgress } from '../../shared/events-name/download-events-names';

const mapStateToProps = (state: RootState) => ({
  savePath: state.download.savePath,
  downloadStatus: state.download.status,
  downloadType: state.download.type,
  downloadSettings: state.download.settings,
  downloadInfo: state.download.info,
  filesProgress: state.download.filesProgress,
  appColor: state.generalSettings.appColor,
  downloadedFileIndex: state.download.downloadedFileIndex,
});

const mapDispatchToProps = (dispatch: any) => ({
  setPersistentDownloadData: (
    persistentData: IDownloadPersistentData,
    changedValues: IChangedValues
  ): IDownloadPersistentData => dispatch(setPersistentDownloadData(persistentData, changedValues)),
  changeDownloadStatus: (downloadStatus: EDownloadStatus): IChangeDownloadStatus =>
    dispatch(changeDownloadStatus(downloadStatus)),
  changeDownloadType: (downloadType: IDownloadType): IChangeDownloadOpts =>
    dispatch(changeDownloadType(downloadType)),
  updateMediaFiles: (mediaFile: Array<IFileInfo>): IUpdateMediaFile =>
    dispatch(updateMediaFiles(mediaFile)),
  updateFilesProgress: (filesProgress: IFilesProgress | {}): IUpdateFileProgress =>
    dispatch(updateFilesProgress(filesProgress)),
  setDownloadedFileIndex: (downloadedFileIndex: number): ISetDownloadedFileIndex =>
    dispatch(setDownloadedFileIndex(downloadedFileIndex)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Download);
