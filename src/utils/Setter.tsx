export type Setter<T> = (newValue: T) => void
export type Setter2<T> = (getNewValue: (oldValue: T) => T) => void

export const setter22setter =
  <T,>(set: Setter2<T>): Setter<T> =>
  (newValue) =>
    set((_oldValue) => newValue)
