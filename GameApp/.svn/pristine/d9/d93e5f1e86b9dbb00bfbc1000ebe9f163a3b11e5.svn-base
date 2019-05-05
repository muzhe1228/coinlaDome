import * as types from "./mutation-types";
import Ajax from "../common/Api/index";
import { lStore, toFixeds } from "../common/func";
import ENV from "../common/Api/ENV";
export default {
  updatedUserInfo({ commit }, userInfo) {
    commit(types.SET_USERINFO, userInfo);
  },
  updateMessageUnRead({ commit }, messageUnReadNum) {
    commit(types.SET_MESSAGE_UNREAD_NUM, messageUnReadNum);
  },

  newGetUserInfo({ commit }) {
    Ajax(
      {
        url: "/uac/user/selectUserInfo",
        data: {
          params: {
            token: lStore.get("Token")
          }
        }
      },
      true
    ).then(res => {
      res.data.head = ENV.getENV().ImageURL + res.data.head;
      console.log('***:', ENV.getENV().ImageURL)
      commit(types.SET_USERINFO, res.data);
    });
  },
  updatedToken({ commit }, token) {
    commit(types.SET_TOKEN, token);
  },
  updatedIsShowLogin({ commit }, Bol) {
    console.log('主动调用弹出登录页面，而非token过期')
    commit(types.SET_ISSHOWLOGIN, Bol);
  },
  //更新可用资产 不包括冻结资产
  updatedPkNum({ commit }, data) {
    console.log('请求余额')
    if (data) {
      let PK = toFixeds(data.availableBalance, 0);
      commit(types.SET_PKNUM, PK);

      let all_PK = toFixeds(data.balance, 0);
      commit(types.SET_ALLPKNUM, all_PK);
    } else {
      Ajax(
        {
          url: "/uas/userAssets/findPkBalance",
          data: {
            params: {
              token: lStore.get("Token"),
              currencyType: 0
            }
          }
        },
        true
      ).then(res => {
        let all_PK = toFixeds(res.data.balance, 0);
        commit(types.SET_ALLPKNUM, all_PK);

        let PK = toFixeds(res.data.availableBalance, 0);
        commit(types.SET_PKNUM, PK);
      });
    }
  },
  setLocalGameName({ commit }, localGameName) {
    commit(types.SET_LOCAL_GAME_NAME, localGameName);
  }
};
