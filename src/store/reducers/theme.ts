import { SET_THEME_COLOR } from "@/store/contant";
import { getThemeColor, setThemeColor } from "@/utils/theme";

let initState = {
  themeColor: getThemeColor() || "#2f98f1",
  // themeMode: getThemeMode() || theme.defaultAlgorithm
};
type IAction = {
  data: string | Function;
  type: string;
};
export default (state = initState, action: IAction) => {
  const { type, data } = action;
  switch (type) {
    case SET_THEME_COLOR:
      // 本地存储保存
      setThemeColor(data as string);
      return { ...initState, themeColor: data };
    default:
      return state;
  }
};
