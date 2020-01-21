import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Application from '../components/Application';
import {
  PersistentAction,
  getAllPersistentData,
  IGetPersistentData
} from '../actions/persistentAction';
import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  themeMode: state.persistent.themeMode,
  appColor: state.persistent.appColor
});

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  getAllPersistentData: (): IGetPersistentData => dispatch(getAllPersistentData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
