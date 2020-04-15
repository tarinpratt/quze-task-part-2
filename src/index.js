import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import store from './store';
import './index.css';
import App from './App';


ReactDOM.render(
  <BrowserRouter>
    <App store={store}/>
  </BrowserRouter>,
  document.getElementById('root')
);


