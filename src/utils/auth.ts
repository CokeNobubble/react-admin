import { IUserinfo } from "@/store/reducers/userinfo";

export let tokeKey = "token";
export let userinfoKey = "userinfo";
export let sidebarMode = "sidebarMode";

export function setToken(token: string) {
  localStorage.setItem(tokeKey, token);
}

export function removeToken() {
  localStorage.removeItem(tokeKey);
}

export function getToken() {
  return localStorage.getItem(tokeKey);
}

export function setUserinfo(userinfo: IUserinfo) {
  localStorage.setItem(userinfoKey, JSON.stringify(userinfo));
}

export function getUserinfo() {
  return localStorage.getItem(userinfoKey);
}

export function setSidebarMode(mode: string) {
  return localStorage.setItem(sidebarMode, mode);
}

export function getSidebarMode() {
  return localStorage.getItem(sidebarMode);
}
