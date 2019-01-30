import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootEpic from '../conf/redux-root-epic';
import createRootReducer from '../conf/redux-root-reducer';

export const history = createBrowserHistory()

const logger = createLogger();
const router = routerMiddleware(history);
const epic = createEpicMiddleware();

const createStoreWithMiddleware = applyMiddleware(epic, router, logger)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(createRootReducer(history), initialState);
    epic.run(rootEpic);
    return store;
}
