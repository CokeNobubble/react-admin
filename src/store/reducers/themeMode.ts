import { SET_THEME_MODE } from '@/store/contant';
import { theme } from 'antd';

let initState = {
  themeMode: theme.defaultAlgorithm
}
type IAction = {
  data: string | Function,
  type: string
}
export default (state = initState, action: IAction) => {
  const { type, data } = action
  switch (type) {
    case SET_THEME_MODE:
      // 本地存储保存
      return { ...initState, themeMode: data }
    default:
      return state
  }
}
