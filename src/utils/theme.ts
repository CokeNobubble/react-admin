/**
 * 主题色存储到本地
 * @param color
 */
export function setThemeColor(color: string) {
  localStorage.setItem('themeColor', color)
}


export function getThemeColor() {
  return localStorage.getItem('themeColor')
}


/**
 * 存储主题模式 default/dark暗黑
 * @param mode
 */
export function setThemeMode(mode: any) {
  console.log(typeof mode, 'mode')
  localStorage.setItem('themeMode', JSON.stringify(mode))
}

export function getThemeMode() {
  return localStorage.getItem('themeMode')
}
