import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import burgerBuilder from './store/reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const store = createStore(
	burgerBuilder,
	composeEnhancers(applyMiddleware(thunk)),
);

//import axios from "axios";
// axios.interceptors.request.use(request =>{
//   console.log(request);
//   return request;
// }, error =>{
//   console.log(error);
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(response =>{
//   console.log(response);
//   return response;
// }, error =>{
//   console.log(error);
//   return Promise.reject(error);
// });

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
