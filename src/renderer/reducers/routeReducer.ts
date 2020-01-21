import { Reducer } from 'redux';

import updateObject from '../utils/update-object';
import { IRouteAction, ERoute } from '../actions/routesAction';

export interface ISelectedRoute {
  mainRoute?: string;
  settingsRoute?: string;
}

export interface IRouteState {
  readonly mainRoute: string;
  readonly settingsRoute: string;
}

const defaultState: IRouteState = {
  mainRoute: '/',
  settingsRoute: '/settings/interface'
};

export const routeReducer: Reducer<IRouteState, IRouteAction> = (
  state: IRouteState = defaultState,
  action: IRouteAction
): IRouteState => {
  switch (action.type) {
    case ERoute.CHANGE_SELECTED_ROUTE:
      return updateObject(state, { ...action.route });
    default:
      return state;
  }
};
