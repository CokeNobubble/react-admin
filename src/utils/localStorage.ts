const persist = JSON.parse(localStorage.getItem("persist:root") as string);

export function getThemeColor() {
  if (persist) {
    const theme = JSON.parse(persist.theme);
    return theme.themeColor;
  }
  return null;
}

export function getUserinfo() {
  if (persist) return JSON.parse(persist.userinfoReducer);
  return null;
}

export function getToken() {
  if (persist) return JSON.parse(persist.userReducer).token;
  return null;
}
