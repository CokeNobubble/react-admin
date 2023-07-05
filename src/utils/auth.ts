export let tokeKey = 'token'

export function setToken(token: string) {
  localStorage.setItem(tokeKey, token)
}

export function removeToken() {
  localStorage.removeItem(tokeKey)
}

export function getToken() {
  return localStorage.getItem(tokeKey)
}
