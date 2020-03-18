import ReactDOM from "react-dom";
import React from 'react';
import App from './app';    
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<BrowserRouter><App history={customHistory}/></BrowserRouter>, wrapper) : false;
