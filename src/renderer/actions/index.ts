import { DownloadAction } from './downloadActions';

export type RootActions = DownloadAction[keyof DownloadAction];
