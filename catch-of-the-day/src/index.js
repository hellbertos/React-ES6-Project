// load Dependencies from Web Pack preloads
import React from 'react';
import {render} from 'react-dom';
import './css/style.css';

import App from './components/App';

import StorePicker from './components/StorePicker'

render(<App/>, document.getElementById('main'));