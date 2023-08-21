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

