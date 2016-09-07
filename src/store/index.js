import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './../reducers';

const loggerMiddleware = createLogger({
  stateTransformer: state => state.toJS()
});

function enableBatching(reducer) {
  return function batchingReducer(state, action) {
    switch (action.type) {
    case 'BATCH_ACTIONS':
      return action.actions.reduce(batchingReducer, state);
    default:
      return reducer(state, action);
    }
  }
}

export function configureStore(preloadedState) {
  return createStore(
    enableBatching(rootReducer),
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
