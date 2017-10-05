import React from 'react';
import {render} from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App.jsx';
import './index.css';

import {Provider} from 'react-redux';
import {store} from './redux';

render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));