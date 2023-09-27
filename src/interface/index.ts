import { IUser } from "@/store/reducers/user";
import { IUserinfo } from "@/store/reducers/userinfo";
import { ICrumbs } from "@/store/reducers/crumbs";
export interface IApiRes {
  code: number;
  data: null;
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
}

/**
 * 分页
 */
export interface IPage {
  size: number;
  current: number;
  total: number;
}
