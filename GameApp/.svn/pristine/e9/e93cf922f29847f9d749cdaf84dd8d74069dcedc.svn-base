import { combineReducers } from "redux-immutable";
import { reducer as HeaderReducer } from "components/Header/store";
import { reducer as LeftNavReducer } from "components/LeftNav/store";
import { reducer as homeReducer } from "pages/Home/store";
import { reducer as modelReducer } from "components/GameModels/store";
import { reducer as I18n } from "components/I18n/store";
import { reducer as Lottery } from "components/Lottery/store";

const reducer = combineReducers({
  header: HeaderReducer,
  leftNav: LeftNavReducer,
  home: homeReducer,
  i18n: I18n,
  model: modelReducer,
  Lottery
});

export default reducer;
