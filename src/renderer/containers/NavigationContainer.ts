import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Navigation from '../components/Home/Navigation/Navigation';

import { IRouteAction, IChangeSelectedRoute, changeSelectedRoute } from '../actions/routesAction';
import { ISelectedRoute } from '../reducers/routeReducer';
import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  appColor: state.persistent.appColor,
  settingsRoute: state.route.settingsRoute
});

const mapDispatchToProps = (dispatch: Dispatch<IRouteAction>) => ({
  changeSelectedRoute: (route: ISelectedRoute): IChangeSelectedRoute =>
    dispatch(changeSelectedRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
