import { combineReducers } from "redux";

import userReducer from "./user";
import userinfoReducer from "@/store/reducers/userinfo";
import count from "@/store/reducers/count";
import theme from "./theme";
import themeMode from "@/store/reducers/themeMode";
import crumbs from "./crumbs";

export default combineReducers({
  userReducer,
  userinfoReducer,
  count,
  theme,
  themeMode,
  crumbs,
});
