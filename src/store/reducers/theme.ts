import { SET_THEME_COLOR, SET_THEME_MODE } from '@/store/contant';
import { getThemeColor, getThemeMode, setThemeColor, setThemeMode } from '@/utils/theme';
import { theme } from 'antd';

let initState = {
  themeColor: getThemeColor() || '#2f98f1',
  themeMode: getThemeMode() || theme.defaultAlgorithm
}
type IAction = {
  data: string | Function,
  type: string
}
export default (state = initState, action: IAction) => {
  const { type, data } = action
  console.log(action, 'action')
  switch (type) {
    case SET_THEME_COLOR:
      // 本地存储保存
      setThemeColor(data as string)
      return { ...initState, themeColor: data }
    case SET_THEME_MODE:
      // 本地存储保存
      // setThemeMode(data)
      return { ...initState, themeMode: data }
    default:
      return state
  }
}
