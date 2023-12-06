import { IAction } from "@/interface";
import { VERTICAL, HORIZONTAL } from "../contant";
import { getSidebarMode, setSidebarMode } from "@/utils/auth";

let initState = {
  sidebarMode: getSidebarMode() || "vertical",
};

export default (state = initState, action: IAction<string>) => {
  const { type, data } = action;
  switch (type) {
    case VERTICAL:
    case HORIZONTAL:
      setSidebarMode(data);
      return { ...state, sidebarMode: data };
    default:
      return state;
  }
};
