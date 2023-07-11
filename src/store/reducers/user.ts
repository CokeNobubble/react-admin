import { LOGIN } from '@/store/contant';
import { getToken, setToken } from '@/utils/auth';
import { IAction } from '@/interface';


export interface IUser {
  token: string
}

let user: IUser = {
  token: getToken() || ''
}
export default function userReducer(preState = user, action: IAction<string>) {
  const { type, data } = action
  switch (type) {
    case LOGIN:
      setToken(data)
      return { ...preState, token: data }
    default:
      return preState
  }
}

