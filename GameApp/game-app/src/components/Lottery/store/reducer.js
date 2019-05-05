import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  Lottery: {},
  isShow: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.LOTTERY:
      return state.set("Lottery", action.Lottery);
    case constants.IS_SHOW:
      return state.set("isShow", action.isShow);
    default:
      return state;
  }
};
