import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Application from '../components/Application';
import {
  PersistentAction,
  getPersistentData,
  GetPersistentData
} from '../actions/persistentAction';

const mapDispatchToProps = (dispatch: Dispatch<PersistentAction>) => ({
  getPersistentData: (): GetPersistentData => dispatch(getPersistentData())
});

export default connect(null, mapDispatchToProps)(Application);
