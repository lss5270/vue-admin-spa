import Cookies from 'js-cookie'

const TokenKey = 'tax_group_app_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expires = 7) {
  return Cookies.set(TokenKey, token, { expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
