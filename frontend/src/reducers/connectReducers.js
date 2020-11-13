import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reducers from './index';

const createRootReducer = (history) =>combineReducers({
  ...reducers,
  router: connectRouter(history)
})

export default createRootReducer;
