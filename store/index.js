import { createStore, compose, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import CommandScreenReducer from '../src/reducers/CommandScreenReducer';
import KnownConnectionsReducer from '../src/reducers/KnownConnectionsReducer';

const reducers = combineReducers({
    cmd: CommandScreenReducer,
    knownConRed: KnownConnectionsReducer
});

const store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware(thunk)
    )
  );

export default store;