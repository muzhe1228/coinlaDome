import * as constants from "./constants";
import { fromJS } from "immutable";
import { lStore } from "common";

const defaultState = fromJS({
  lang: lStore.get("lang") || "zh"
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.LANG:
      lStore.set("lang", action.lang);
      return state.set("lang", action.lang);
    default:
      return state;
  }
};
