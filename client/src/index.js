import React from 'react';
import ReactDOM from 'react-dom';

import '@atlaskit/css-reset';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
