export function setItem(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function getItem(key) {
  let value
  try {
    value = JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    value = null
  }
  return value
}

export function removeItem(key) {
  window.localStorage.removeItem(key)
}