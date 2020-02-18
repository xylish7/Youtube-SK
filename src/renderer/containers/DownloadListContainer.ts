import { connect, ConnectedProps } from 'react-redux';

import DownloadList from '../components/Home/Features/Download/DownloadList/DownloadList';

import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  mediaFiles: state.download.mediaFiles,
  filesProgress: state.download.filesProgress,
  appColor: state.generalSettings.appColor
});

const connector = connect(mapStateToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DownloadList);
