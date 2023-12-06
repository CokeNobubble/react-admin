import { IUser } from "@/store/reducers/user";
import { IUserinfo } from "@/store/reducers/userinfo";
import { ICrumbs } from "@/store/reducers/crumbs";
import { IPermissionState } from "@/store/reducers/permission";

export interface IApiRes<T> {
  code: number;
  data: any | T;
  msg: string;
  success: boolean;
}

/**
 * redux action
 */
export interface IAction<T> {
  type: string;
  data: T;
}

export interface ITheme {
  themeColor: string;
}

export interface ISidebarMode {
  sidebarMode: string;
}

/**
 * redux state
 */
export interface IState {
  userReducer: IUser;
  userinfoReducer: IUserinfo;
  count: number;
  theme: ITheme;
  themeMode: any;
  crumbs: ICrumbs;
  permission: IPermissionState;
  sidebarMode: ISidebarMode;
}

/**
 * 分页
 */
export interface IPage {
  size: number;
  current: number;
  total: number;
}
