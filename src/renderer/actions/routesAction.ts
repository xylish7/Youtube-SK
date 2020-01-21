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
 * Get persistent data from local store
 */

export const changeSelectedRoute: ActionCreator<IChangeSelectedRoute> = (
  route: ISelectedRoute
) => ({
  type: ERoute.CHANGE_SELECTED_ROUTE,
  route
});

export type IRouteAction = IChangeSelectedRoute;
