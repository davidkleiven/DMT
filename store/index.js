import { createStore, compose, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import CommandScreenReducer from '../src/reducers/CommandScreenReducer';

const reducers = combineReducers({
    cmd: CommandScreenReducer
});

const store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware(thunk)
    )
  );

export default store;