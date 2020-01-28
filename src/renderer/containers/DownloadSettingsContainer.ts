import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import DownloadSettings from '../components/Settings/DownloadSettings/DownloadSettings';
import { RootState } from '../reducers';
import {
  PersistentAction,
  changePersistentValues,
  IChangePersistentValues
} from '../actions/persistentAction';

import { IChangedValues } from '../constants/persistent-data-store';

const mapStateToProps = (state: RootState) => ({
  appColor: state.persistent.appColor,
  downloadSettings: {
    downloadAudioQuality: state.persistent.downloadAudioQuality,
    downloadAudioFormat: state.persistent.downloadAudioFormat,
    downloadVideoQuality: state.persistent.downloadVideoQuality,
    downloadVideoFormat: state.persistent.downloadVideoFormat
  }
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  changePersistentValues: (changedValues: IChangedValues): IChangePersistentValues =>
    dispatch(changePersistentValues(changedValues))
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadSettings);
