import { swap } from './swap'

describe('swap', () => {
  it('does not mutate the input', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    swap(array, 0, 1)
    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6])
  })
  it('returns a new array if it was rearranged', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    expect(swap(array, 0, 1)).not.toBe(array)
  })
  it('returns the same array if any of the indices are out of bounds', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    expect(swap(array, -1, 1)).toEqual(array)
    expect(swap(array, 100, 1)).toEqual(array)
    expect(swap(array, 0, 100)).toEqual(array)
  })
  it('swaps places for arrays with a single element', () => {
    expect(swap([0], 0, 0)).toEqual([0])
  })
  it('swaps places for arrays with two elements the beginning of the array', () => {
    expect(swap([0, 1], 0, 1)).toEqual([1, 0])
  })
  it('swaps places at the start of the the array', () => {
    expect(swap([0, 1, 2, 3], 0, 1)).toEqual([1, 0, 2, 3])
  })
  it('swaps places at the end of the the array', () => {
    expect(swap([0, 1, 2, 3], 2, 3)).toEqual([0, 1, 3, 2])
  })
  it('swaps places in the middle of the the array', () => {
    expect(swap([0, 1, 2, 3], 1, 2)).toEqual([0, 2, 1, 3])
  })
  it('swaps places of two items with other items betweem', () => {
    expect(swap([0, 1, 2, 3, 4], 1, 3)).toEqual([0, 3, 2, 1, 4])
  })
  it('swaps places of two items where one is undefined', () => {
    // This is to ensure that we don't accidentally check index out of bounds with items[index],
    //  because undefined is allowed to be in the array
    expect(swap([undefined, 1], 0, 1)).toEqual([1, undefined])
  })
  it('returns the same array if the indices are equal', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    expect(swap(array, 0, 0)).toEqual(array)
    expect(swap(array, 1, 1)).toEqual(array)
    expect(swap(array, 3, 3)).toEqual(array)
    expect(swap(array, 5, 5)).toEqual(array)
  })
})
