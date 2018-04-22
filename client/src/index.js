import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
// import axios from 'axios';
import 'antd/dist/antd.css';
import registerServiceWorker from './registerServiceWorker';

// axios.post('http://localhost:3000/project/create', {name: 'ccccccccc123e12', host: ['sss'], users: ['1231'], creator: 'aa'});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
