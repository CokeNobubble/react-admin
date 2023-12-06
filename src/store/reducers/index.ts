import { combineReducers } from "redux";

import userReducer from "./user";
import userinfoReducer from "@/store/reducers/userinfo";
import count from "@/store/reducers/count";
import theme from "./theme";
import themeMode from "@/store/reducers/themeMode";
import crumbs from "./crumbs";
import permission from "@/store/reducers/permission";
import sidebarMode from "./sidebarMode";

export default combineReducers({
  userReducer,
  userinfoReducer,
  count,
  theme,
  themeMode,
  crumbs,
  permission,
  sidebarMode,
});
