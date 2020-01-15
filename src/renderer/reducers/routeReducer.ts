import { Reducer } from 'redux';

import updateObject from '../utils/update-object';
import { IRouteAction, ERoute } from '../actions/routesAction';

export interface IRouteState {
  readonly mainRoute: string;
}

const defaultState: IRouteState = {
  mainRoute: '/'
};

export const routeReducer: Reducer<IRouteState, IRouteAction> = (
  state: IRouteState = defaultState,
  action: IRouteAction
): IRouteState => {
  switch (action.type) {
    case ERoute.CHANGE_MAIN_ROUTE:
      return updateObject(state, { mainRoute: action.route });

    default:
      return state;
  }
};
