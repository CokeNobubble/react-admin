import { SET_USERINFO } from '@/store/contant';
import { getUserinfo, setUserinfo } from '@/utils/auth';
import { IAction } from '@/interface';


export interface IUserinfo {
  id: number,
  nickname: string,
  user_pic: string,
  username: string
  role:string
  roles:string[]
}

let userinfo: IUserinfo = {
  id: 0,
  nickname: '',
  user_pic: '',
  username: '',
  role:'',
  roles:[]
}
export default function userinfoReducer(preState = userinfo, action: IAction<IUserinfo>) {
  const { type, data } = action
  switch (type) {
    case SET_USERINFO:
      userinfo = data
      // setUserinfo(userinfo)
      return data
    default:
      return preState
  }
}
