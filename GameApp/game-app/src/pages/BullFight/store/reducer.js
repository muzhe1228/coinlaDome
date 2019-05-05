import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	homeTitle: '12222222'
});


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.HOME_DATA:
			return state.set('homeTitle', action.title);
		default:
			return state;
	}
}