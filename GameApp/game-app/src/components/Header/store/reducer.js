import { fromJS } from "immutable";
import * as constants from "./constants";
import { lStore } from "common";

const defaultState = fromJS({
  HeaderInfo: lStore.get("HeaderInfo") || "/",
  isScreen: false,
  showLogin: -1,
  userInfo: lStore.get("userInfo") || {},
  Lottery: {},
  PKData: {}
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.USER_INFO:
      lStore.set("userInfo", fromJS(action.userInfo));
      return state.set("userInfo", fromJS(action.userInfo));
    case constants.HEADER_INFO:
      lStore.set("HeaderInfo", action.HeaderInfo);
      return state.set("HeaderInfo", action.HeaderInfo);
    case constants.IS_SCREEN:
      return state.set("isScreen", action.isScreen);
    case constants.SHOW_LOGIN:
      if (action.showLogin === 0) {
        lStore.remove("userInfo");
        lStore.remove("Token");
      }
      return state.set("showLogin", action.showLogin);
    case constants.LOTTERY:
      return state.set("Lottery", action.Lottery);
    case constants.PK_DATA:
      return state.set("PKData", action.PKData);
    default:
      return state;
  }
};
