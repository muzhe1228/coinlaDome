import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	ModelNames: null
});


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.MODEL_NAMES:
			return state.set('ModelNames', action.ModelNames);
		default:
			return state;
	}
}