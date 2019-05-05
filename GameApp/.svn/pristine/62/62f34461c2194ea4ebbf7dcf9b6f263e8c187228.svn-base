import * as types from "./mutation-types";
import { lStore } from "../common/func";
export default {
  [types.SET_USERINFO](state, userInfo) {
    if (!userInfo) {
      lStore.remove("userInfo");
    } else {
      lStore.set("userInfo", userInfo);
    }
    state.userInfo = userInfo;
  },
  [types.SET_TOKEN](state, token) {
    if (!token) {
      lStore.remove("Token");
    } else {
      lStore.set("Token", token);
    }
    state.token = token;
  },
  [types.SET_PKNUM](state, PkNum) {
    lStore.set("PkNum", PkNum);
    state.PkNum = PkNum;
  },
  [types.SET_ALLPKNUM](state, AllPkNum) {
    lStore.set("AllPkNum", AllPkNum);
    state.AllPkNum = AllPkNum;
  },
  [types.SET_ISSHOWLOGIN](state, Bol) {
    state.isShowLogin = Bol;
  },
  [types.SET_MESSAGE_UNREAD_NUM](state, messageUnReadNum) {
    state.messageUnReadNum = messageUnReadNum;
  },
  [types.SET_LOCAL_GAME_NAME](state, localGameName) {
    state.localGameName = localGameName;
  },
  setRouterPath(state, routerPath) {
    state.routerPath = routerPath;
  },
  setMdToken(state, token) {
    state.testToken = token;
  }
};
