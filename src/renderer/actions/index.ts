import { PersistentAction } from './persistentAction';
import { IDownloadAction } from './downloadAction';

export type RootActions =
  | PersistentAction[keyof PersistentAction]
  | IDownloadAction[keyof IDownloadAction];
