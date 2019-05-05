import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  isShowNav: false,
  msgNum: 0
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.IS_SHOW_NAV:
      return state.set("isShowNav", action.isShowNav);
    case constants.MSG_NUM:
      return state.set("msgNum", action.msgNum);
    default:
      return state;
  }
};
