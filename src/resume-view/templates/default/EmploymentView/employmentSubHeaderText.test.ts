import { employmentSubHeaderText } from '@/resume-view/templates/default/EmploymentView/EmploymentSubHeaderText'

describe('employmentSubHeaderLabel', () => {
  it('handles neither', () => {
    expect(
      employmentSubHeaderText({
        startDate: '',
        endDate: '',
      }),
    ).toBeUndefined()
  })
  it('handles both', () => {
    expect(
      employmentSubHeaderText({
        startDate: '2020',
        endDate: '2022',
      }),
    ).toBe('2020 – 2022')
  })
  it('handles only startDate', () => {
    expect(
      employmentSubHeaderText({
        startDate: '2020',
        endDate: '',
      }),
    ).toBe('2020 – Present')
  })
  it('handles no arguments', () => {
    expect(
      employmentSubHeaderText({
        startDate: '',
        endDate: '2022',
      }),
    ).toBe('Until 2022')
  })
})
