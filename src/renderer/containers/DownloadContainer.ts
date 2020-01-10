import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Download from '../components/Home/Features/Download/Download';
import { RootState } from '../reducers';
import { DownloadAction, changeSavePath, ChangePathAction } from '../actions/downloadActions';

const mapStateToProps = (state: RootState) => ({
  savePath: state.download.savePath
});

const mapDispatchToProps = (dispatch: Dispatch<DownloadAction>) => ({
  changeSavePath: (savePath: string): ChangePathAction => dispatch(changeSavePath(savePath))
});

export default connect(mapStateToProps, mapDispatchToProps)(Download);
