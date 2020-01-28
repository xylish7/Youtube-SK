import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Application from '../components/Application';
import {
  PersistentAction,
  getAllPersistentData,
  IGetPersistentData
} from '../actions/persistentAction';
import { RootState } from '../reducers';
import {
  IDownloadAction,
  IChangeDownloadStatus,
  IUpdateMediaFile,
  changeDownloadStatus,
  updateMediaFiles,
  IUpdateFileProgress,
  updateFileProgress
} from '../actions/downloadAction';
import { EDownloadStatus } from '../reducers/downloadReducer';
import { IFileInfo, IFileProgress } from '../../shared/events-name/download-events-names';

const mapStateToProps = (state: RootState) => ({
  themeMode: state.persistent.themeMode,
  appColor: state.persistent.appColor,
  downloadStatus: state.download.status
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction | IDownloadAction>) => ({
  getAllPersistentData: (): IGetPersistentData => dispatch(getAllPersistentData()),
  changeDownloadStatus: (downloadStatus: EDownloadStatus): IChangeDownloadStatus =>
    dispatch(changeDownloadStatus(downloadStatus)),
  updateMediaFiles: (mediaFile: Array<IFileInfo>): IUpdateMediaFile =>
    dispatch(updateMediaFiles(mediaFile)),
  updateFileProgress: (fileProgress: IFileProgress): IUpdateFileProgress =>
    dispatch(updateFileProgress(fileProgress))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
