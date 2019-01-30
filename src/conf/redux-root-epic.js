import { combineEpics } from 'redux-observable';
import { epics as item } from '../ducks/item';

export default combineEpics(...[
    ...item,
]);