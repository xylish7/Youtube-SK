import { connect, ConnectedProps } from 'react-redux';

import Settings from '../components/Settings/Settings';

import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  mainRoute: state.route.mainRoute
});

const connector = connect(mapStateToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Settings);
