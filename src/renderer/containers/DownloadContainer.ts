import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Download from '../components/Home/Features/Download/Download';
import { RootState } from '../reducers';
import {
  PersistentAction,
  changeDownloadSavePath,
  IChangeDownloadSavePath
} from '../actions/persistentAction';
import {
  IChangeDownloadStatus,
  changeDownloadStatus,
  IDownloadAction,
  IChangeDownloadOpts,
  changeDownloadOpts
} from '../actions/downloadAction';
import { EDownloadStatus, IDownloadOpts } from '../reducers/downloadReducer';

const mapStateToProps = (state: RootState) => ({
  savePath: state.persistent.downloadSavePath,
  downloadStatus: state.download.status,
  downloadOpts: state.download.options
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction | IDownloadAction>) => ({
  changeSavePath: (savePath: string): IChangeDownloadSavePath =>
    dispatch(changeDownloadSavePath(savePath)),
  changeDownloadStatus: (downloadStatus: EDownloadStatus): IChangeDownloadStatus =>
    dispatch(changeDownloadStatus(downloadStatus)),
  changeDownloadOpts: (downloadOpts: IDownloadOpts): IChangeDownloadOpts =>
    dispatch(changeDownloadOpts(downloadOpts))
});

export default connect(mapStateToProps, mapDispatchToProps)(Download);
