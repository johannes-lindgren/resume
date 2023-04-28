export const swap = <T,>(
  items: T[],
  indexA: number,
  indexB: number,
): T[] => {
  if (
    indexA < 0 ||
    indexB < 0 ||
    indexA > items.length - 1 ||
    indexB > items.length - 1
  ) {
    return items
  }

  if (indexA === indexB) {
    return items
  }

  const leftIndex = Math.min(indexA, indexB)
  const rightIndex = Math.max(indexA, indexB)

  const leftValue = items[leftIndex] as T
  const rightValue = items[rightIndex] as T

  return [
    ...items.slice(0, leftIndex),
    rightValue,
    ...items.slice(leftIndex + 1, rightIndex),
    leftValue,
    ...items.slice(rightIndex + 1),
  ]
}
