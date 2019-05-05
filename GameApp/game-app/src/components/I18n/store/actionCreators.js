import * as constants from "./constants";

export const getLang = lang => {
  return {
    type: constants.LANG,
    lang
  };
};
