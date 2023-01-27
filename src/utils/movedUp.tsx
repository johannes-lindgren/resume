export const movedUp = <T,>(
  arr: T[],
  where: (it: T, index: number) => boolean,
): T[] => {
  const index = arr.findIndex(where)
  return [
    ...arr.slice(0, index),
    arr[index + 1],
    arr[index],
    ...arr.slice(index + 2, arr.length),
  ]
}
