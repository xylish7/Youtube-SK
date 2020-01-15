import { connect } from 'react-redux';

import Settings from '../components/Settings/Settings';

import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  mainRoute: state.route.mainRoute
});

export default connect(mapStateToProps, null)(Settings);
