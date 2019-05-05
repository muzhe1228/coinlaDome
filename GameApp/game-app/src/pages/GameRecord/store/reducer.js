import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	list: []
});


export default (state = defaultState, action) => {
	switch(action.type) {
    case constants.GAME_RECORD_INIT:
      const newState = JSON.parse(JSON.stringify(state));
      newState.list.push(action.data);
      return state.set('game_record_data', newState);

    case constants.GAME_RECORD_CHANGE:
      const newState1 = JSON.parse(JSON.stringify(state));
      newState1.list.push(action.data);
      return state.set('game_record_data', newState1);

    case constants.GAME_RECORD_LOAD_MORE:
      const newState2 = JSON.parse(JSON.stringify(state));
      newState2.list.push(action.data);
      return state.set('game_record_data', newState2);
		default:
			return state;
	}
}