import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import item from '../ducks/item';

export default history => combineReducers({
    router: connectRouter(history),
    item,
});
