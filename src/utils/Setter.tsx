export type Setter2<T> = (getNewValue: (oldValue: T) => T) => void
