import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux-starter-kit';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const reducer = combineReducers(reducers);
export type IState = ReturnType<typeof reducer>;

export default () => {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(reducer, composeEnhancers(middlewares));

  sagaMiddleware.run(sagas);

  return store;
};
