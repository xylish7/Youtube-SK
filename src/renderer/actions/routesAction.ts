import { Action, ActionCreator } from 'redux';
import { ISelectedRoute } from '../reducers/routeReducer';

export enum ERoute {
  CHANGE_SELECTED_ROUTE = 'CHANGE_SELECTED_ROUTE'
}

export interface IChangeSelectedRoute extends Action {
  type: ERoute.CHANGE_SELECTED_ROUTE;
  route: ISelectedRoute;
}

/**
 * Change the route in the redux store when the user navigates
 * to another route
 * @param {ISelectedRoute} route
 */
export const changeSelectedRoute: ActionCreator<IChangeSelectedRoute> = (
  route: ISelectedRoute
) => ({
  type: ERoute.CHANGE_SELECTED_ROUTE,
  route
});

export type IRouteAction = IChangeSelectedRoute;
