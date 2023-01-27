export const without = <T,>(
  arr: T[],
  where: (it: T, index: number) => boolean,
): T[] => arr.filter((it, index) => !where(it, index))
