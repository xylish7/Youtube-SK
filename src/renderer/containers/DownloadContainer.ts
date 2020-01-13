import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Download from '../components/Home/Features/Download/Download';
import { RootState } from '../reducers';
import {
  PersistentAction,
  changeDownloadSavePath,
  ChangeDownloadSavePathAction
} from '../actions/persistentAction';

const mapStateToProps = (state: RootState) => ({
  savePath: state.persistent.downloadSavePath
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  changeSavePath: (savePath: string): ChangeDownloadSavePathAction =>
    dispatch(changeDownloadSavePath(savePath))
});

export default connect(mapStateToProps, mapDispatchToProps)(Download);
