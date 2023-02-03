export type Setter<T> = (getNewValue: (oldValue: T) => T) => void
