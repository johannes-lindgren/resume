export const readFromLocalStorage = (): unknown => {
  try {
    const item = window.localStorage.getItem(localStorageKey)
    if (item === null) {
      return undefined
    }
    return JSON.parse(item)
  } catch (error) {
    return error
  }
}
export const saveToLocalStorage = (value: unknown) => {
  try {
    const json = JSON.stringify(value)
    if (typeof json === 'undefined') {
      console.error('Failed to stringify', value)
      return new Error('Failed to stringify the resume')
    }
    window.localStorage.setItem(localStorageKey, json)
  } catch (error) {
    return error
  }
}
export const localStorage = () => {
  window.localStorage.removeItem(localStorageKey)
}
const localStorageKey = 'resume'
