import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import  persistState  from 'redux-localstorage';
import reducers from '../reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();
const middleware= routerMiddleware(history);

const enhancer = compose(
  applyMiddleware(middleware,thunk),
  persistState('user')
);

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history)
})

export default function configureStore(){
  return createStore(
    rootReducer,
    enhancer
  );
}
