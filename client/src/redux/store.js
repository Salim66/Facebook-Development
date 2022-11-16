import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk];

// create redux store
const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(...middleware) ) );


// export default
export default store;