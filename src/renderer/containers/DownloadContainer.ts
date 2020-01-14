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
  IChangeDownloadState,
  changeDownloadState,
  IDownloadAction
} from '../actions/downloadAction';
import { EDownloadStatus } from '../reducers/downloadReducer';

const mapStateToProps = (state: RootState) => ({
  savePath: state.persistent.downloadSavePath,
  downloadStatus: state.download.downloadStatus
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction | IDownloadAction>) => ({
  changeSavePath: (savePath: string): IChangeDownloadSavePath =>
    dispatch(changeDownloadSavePath(savePath)),
  changeDownloadState: (downloadStatus: EDownloadStatus): IChangeDownloadState =>
    dispatch(changeDownloadState(downloadStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(Download);
