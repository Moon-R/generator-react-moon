import { combineReducers } from 'redux';

function getInitState(state={}, action) {
	return state
}

const rootReducer = combineReducers({
	getInitState
});

export default rootReducer;