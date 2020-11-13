import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import  persistState  from 'redux-localstorage';
import createRootReducer from '../reducers/connectReducers';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

export default function configureStore(preloadedState){
  const middleware = routerMiddleware(history);
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const enhacer = composeEnhancers(
    applyMiddleware(middleware,thunk),
    persistState('user')
  );

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    enhacer
  )
  return store;
}
