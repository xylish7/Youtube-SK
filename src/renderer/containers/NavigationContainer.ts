import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import Navigation from '../components/Home/Navigation/Navigation';

import { IRouteAction, IChangeSelectedRoute, changeSelectedRoute } from '../actions/routesAction';
import { ISelectedRoute } from '../reducers/routeReducer';
import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  appColor: state.generalSettings.appColor,
  settingsRoute: state.route.settingsRoute
});

const mapDispatchToProps = (dispatch: Dispatch<IRouteAction>) => ({
  changeSelectedRoute: (route: ISelectedRoute): IChangeSelectedRoute =>
    dispatch(changeSelectedRoute(route))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
