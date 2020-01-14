import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Application from '../components/Application';
import {
  PersistentAction,
  getPersistentData,
  IGetPersistentData
} from '../actions/persistentAction';

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  getPersistentData: (): IGetPersistentData => dispatch(getPersistentData())
});

export default connect(null, mapDispatchToProps)(Application);
