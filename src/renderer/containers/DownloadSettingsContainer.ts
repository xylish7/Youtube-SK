import { connect, ConnectedProps } from 'react-redux';

import DownloadSettings from '../components/Settings/DownloadSettings/DownloadSettings';
import { RootState } from '../reducers';

import { IChangedValues } from '../constants/persistent-data-store';
import { setPersistentDownloadData, IDownloadPersistentData } from '../actions/downloadAction';

const mapStateToProps = (state: RootState) => ({
  appColor: state.generalSettings.appColor,
  downloadSettings: state.download.settings
});

const mapDispatchToProps = (dispatch: any) => ({
  setPersistentDownloadData: (
    persistentData: IDownloadPersistentData,
    changedValues: IChangedValues
  ): IDownloadPersistentData => dispatch(setPersistentDownloadData(persistentData, changedValues))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DownloadSettings);
