import { connect } from 'react-redux';

import DownloadList from '../components/Home/Features/Download/DownloadList/DownloadList';

import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  mediaFiles: state.download.mediaFiles,
  filesProgress: state.download.filesProgress
});

export default connect(mapStateToProps, null)(DownloadList);
