import {
  transformToDomUnits,
  transformToPdfUnits,
} from '@/resume-view/primitives/Styles'

describe('unit transformation', () => {
  describe('transformToDomUnits', () => {
    it('does not transform undefined', () => {
      expect(transformToDomUnits(undefined)).toBeUndefined()
    })
    it('does not transform numbers', () => {
      expect(transformToDomUnits(123)).toEqual(123)
    })
    it('does not transform %', () => {
      expect(transformToDomUnits('23%')).toEqual('23%')
    })
    it('transforms natural numbers in unit u to px', () => {
      expect(transformToDomUnits('54u')).toEqual('54px')
    })
    it('transforms decimal values in unit u to px', () => {
      expect(transformToDomUnits('54.20u')).toEqual('54.20px')
    })
    it('transforms negative decimal values in unit u to px', () => {
      expect(transformToDomUnits('-54.75u')).toEqual('-54.75px')
    })
    it('does not transform words with u', () => {
      expect(transformToDomUnits('column')).toEqual('column')
    })
  })
  describe('transformToDomUnits', () => {
    it('does not transform undefined', () => {
      expect(transformToPdfUnits(undefined)).toBeUndefined()
    })
    it('does not transform numbers', () => {
      expect(transformToPdfUnits(123)).toEqual(123)
    })
    it('does not transform %', () => {
      expect(transformToPdfUnits('23%')).toEqual('23%')
    })
    it('transforms natural numbers in unit u to pt', () => {
      expect(transformToPdfUnits('54u')).toEqual('54pt')
    })
    it('transforms decimal values in unit u to pt', () => {
      expect(transformToPdfUnits('54.20u')).toEqual('54.20pt')
    })
    it('transforms negative decimal values in unit u to pt', () => {
      expect(transformToPdfUnits('-54.75u')).toEqual('-54.75pt')
    })
    it('transforms numbers as part of longer strings', () => {
      expect(transformToPdfUnits('2u 3u 5u')).toEqual('2pt 3pt 5pt')
    })
    it('does not transform words with u', () => {
      expect(transformToDomUnits('column')).toEqual('column')
    })
  })
})
