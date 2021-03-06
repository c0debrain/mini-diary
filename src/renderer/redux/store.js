import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import app from './reducers/appReducer';
import diary from './reducers/diaryReducer';
import file from './reducers/fileReducer';
import exportReducer from './reducers/exportReducer';
import importReducer from './reducers/importReducer';


// Combine reducers
const reducers = combineReducers({
	app,
	diary,
	file,
	export: exportReducer,
	import: importReducer
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Set up middleware
let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
	middleware = [...middleware, createLogger()];
}

// Create store
export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
