import { connect, ConnectedProps } from 'react-redux';

import InterfaceSettings from '../components/Settings/InterfaceSettings/InterfaceSettings';
import { RootState } from '../reducers';

import { IChangedValues } from '../constants/persistent-data-store';
import {
  IGeneralSettingsPersistentData,
  setPersistentGeneralSettingsData
} from '../actions/generalSettingsAction';

const mapStateToProps = (state: RootState) => ({
  themeMode: state.generalSettings.themeMode,
  appColor: state.generalSettings.appColor
});

const mapDispatchToProps = (dispatch: any) => ({
  setPersistentGeneralSettingsData: (
    persistentData: IGeneralSettingsPersistentData,
    changedValues: IChangedValues
  ): IGeneralSettingsPersistentData =>
    dispatch(setPersistentGeneralSettingsData(persistentData, changedValues))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InterfaceSettings);
