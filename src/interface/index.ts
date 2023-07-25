import { IUser } from '@/store/reducers/user';
import { IUserinfo } from '@/store/reducers/userinfo';

export interface IApiRes {
  code: number,
  data: null,
  msg: string
}


export interface IAction<T> {
  type: string,
  data: T
}

export interface ITheme {
  themeColor: string,
  themeMode: any
}

export interface IState {
  userReducer: IUser,
  userinfoReducer: IUserinfo,
  count: number,
  theme: ITheme
}

/**
 * 分页
 */
export interface IPage {
  size: number
  current: number
  total: number
}
