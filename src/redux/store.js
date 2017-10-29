import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';


const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const sagaMiddleware = createSagaMiddleware();

export default (history, initState) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
