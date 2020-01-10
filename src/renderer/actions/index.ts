import { PersistentAction } from './persistentAction';

export type RootActions = PersistentAction[keyof PersistentAction];
