export const withBefore = <T,>(
  items: T[],
  item: T,
  where: (it: T, index: number) => boolean,
): T[] => {
  const index = items.findIndex(where)
  if (index === -1) {
    return [item, ...items]
  }
  return [...items.slice(0, index), item, ...items.slice(index)]
}

export const withAfter = <T,>(
  items: T[],
  item: T,
  where: (it: T, index: number) => boolean,
): T[] => {
  const index = items.findIndex(where)
  if (index === -1) {
    return [...items, item]
  }
  return [...items.slice(0, index + 1), item, ...items.slice(index + 1)]
}
