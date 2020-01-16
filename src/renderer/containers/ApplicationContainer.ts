import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Application from '../components/Application';
import {
  PersistentAction,
  getAllPersistentData,
  IGetPersistentData
} from '../actions/persistentAction';

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  getAllPersistentData: (): IGetPersistentData => dispatch(getAllPersistentData())
});

export default connect(null, mapDispatchToProps)(Application);
