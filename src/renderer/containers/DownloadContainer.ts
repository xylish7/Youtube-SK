import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Download from '../components/Home/Features/Download/Download';
import { RootState } from '../reducers';
import {
  PersistentAction,
  changePersistentValues,
  IChangePersistentValues
} from '../actions/persistentAction';
import {
  IChangeDownloadStatus,
  changeDownloadStatus,
  IDownloadAction,
  IChangeDownloadOpts,
  changeDownloadOpts,
  IUpdateMediaFile,
  updateMediaFiles,
  IUpdateFileProgress,
  updateFileProgress
} from '../actions/downloadAction';
import { EDownloadStatus, IDownloadOpts } from '../reducers/downloadReducer';
import { IChangedValues } from '../constants/persistent-data-store';
import { IFileInfo, IFileProgress } from '../../shared/events-name/download-events-names';

const mapStateToProps = (state: RootState) => ({
  savePath: state.persistent.downloadSavePath,
  downloadStatus: state.download.status,
  downloadOpts: state.download.options
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction | IDownloadAction>) => ({
  changePersistentValues: (changedValues: IChangedValues): IChangePersistentValues =>
    dispatch(changePersistentValues(changedValues)),
  changeDownloadStatus: (downloadStatus: EDownloadStatus): IChangeDownloadStatus =>
    dispatch(changeDownloadStatus(downloadStatus)),
  changeDownloadOpts: (downloadOpts: IDownloadOpts): IChangeDownloadOpts =>
    dispatch(changeDownloadOpts(downloadOpts)),
  updateMediaFiles: (mediaFile: Array<IFileInfo>): IUpdateMediaFile =>
    dispatch(updateMediaFiles(mediaFile)),
  updateFileProgress: (fileProgress: IFileProgress): IUpdateFileProgress =>
    dispatch(updateFileProgress(fileProgress))
});

export default connect(mapStateToProps, mapDispatchToProps)(Download);
