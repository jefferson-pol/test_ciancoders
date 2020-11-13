import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import configureStore, {history} from './store/configStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}/>
  </Provider>
  ,document.getElementById('root'));
registerServiceWorker();
