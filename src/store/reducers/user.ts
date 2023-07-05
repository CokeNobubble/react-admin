import { LOGIN } from '@/store/contant';
import { setToken } from '@/utils/auth';

export interface IAction {
  type: string,
  data: string
}

let token: string = ''
export default function userReducer(preState = token, action: IAction) {
  const { type, data } = action
  switch (type) {
    case LOGIN:
      token = data
      setToken(token)
      return preState
    default:
      return preState
  }
}
