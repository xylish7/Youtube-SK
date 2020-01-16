import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import InterfaceSettings from '../components/Settings/InterfaceSettings/InterfaceSettings';
import { RootState } from '../reducers';
import {
  PersistentAction,
  changePersistentValues,
  IChangePersistentValues
} from '../actions/persistentAction';

import { IChangedValues } from '../constants/persistent-data-store';

const mapStateToProps = (state: RootState) => ({
  themeMode: state.persistent.themeMode
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  changePersistentValues: (changedValues: IChangedValues): IChangePersistentValues =>
    dispatch(changePersistentValues(changedValues))
});

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceSettings);
