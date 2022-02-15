import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceAddReducer from '../reducers/serviceAdd';
import serviceEditReducer from '../reducers/serviceEdit';
import serviceFilterReducer from '../reducers/serviceFilter';
import saga from '../sagas';
import createSagaMiddleware from 'redux-saga';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer,
  serviceEdit: serviceEditReducer,
  serviceFilter: serviceFilterReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(saga);

export default store;
