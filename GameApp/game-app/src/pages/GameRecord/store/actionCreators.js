import * as constants from "./constants";
import axios from "axios";

export const initGameRecordAction = data => ({
  type: constants.GAME_RECORD_INIT,
  data
});

//切换类型
export const GameRecordChangeAction = value => ({
  type: constants.GAME_RECORD_CHANGE,
  value
});

// export const GameRecordLoadMoreAction = data => ({
//   type: constants.GAME_RECORD_LOAD_MORE,
//   data
// });

// export const getGameRecordList = () => {
//   return dispatch => {
//     const data = {};
//     const action = initGameRecordAction(data);
//     dispatch(action);
//   };
// };

export const GameRecordChange = (data) => {
  return dispatch => {

    const data = {};
    const action = GameRecordChangeAction(data);
    dispatch(action);
  };
};

export const GameRecordLoadMore = (data) => {
  return dispatch => {

    // const data = {};
    // const action = GameRecordLoadMoreAction(data);
    // dispatch(action);
  };
};
