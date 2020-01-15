import { Action, ActionCreator } from 'redux';

export enum ERoute {
  CHANGE_MAIN_ROUTE = 'CHANGE_MAIN_ROUTE'
}

export interface IChangeMainRoute extends Action {
  type: ERoute.CHANGE_MAIN_ROUTE;
  route: string;
}

/**
 * Get persistent data from local store
 */

export const changeMainRoute: ActionCreator<IChangeMainRoute> = (route: string) => ({
  type: ERoute.CHANGE_MAIN_ROUTE,
  route
});

export type IRouteAction = IChangeMainRoute;
