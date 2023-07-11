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


export interface IState {
  userReducer: IUser,
  userinfoReducer: IUserinfo,
  count: number
}
