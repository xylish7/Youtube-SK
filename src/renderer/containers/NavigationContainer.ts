import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Navigation from '../components/Home/Navigation/Navigation';

import { IRouteAction, IChangeMainRoute, changeMainRoute } from '../actions/routesAction';

const mapDispatchToProps = (dispatch: Dispatch<IRouteAction>) => ({
  changeMainRoute: (route: string): IChangeMainRoute => dispatch(changeMainRoute(route))
});

export default connect(null, mapDispatchToProps)(Navigation);
