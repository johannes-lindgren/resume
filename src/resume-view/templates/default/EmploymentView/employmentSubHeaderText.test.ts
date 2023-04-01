import { employmentSubHeaderText } from '@/resume-view/templates/default/EmploymentView/EmploymentSubHeaderText'

const defaultLocale = 'en-US'
describe('employmentSubHeaderLabel', () => {
  it('handles neither', () => {
    expect(
      employmentSubHeaderText(
        {
          startDate: '',
          endDate: '',
        },
        defaultLocale,
      ),
    ).toBeUndefined()
  })
  it('handles both', () => {
    expect(
      employmentSubHeaderText(
        {
          startDate: '2020',
          endDate: '2022',
        },
        defaultLocale,
      ),
    ).toBe('2020 – 2022')
  })
  it('handles only startDate', () => {
    expect(
      employmentSubHeaderText(
        {
          startDate: '2020',
          endDate: '',
        },
        defaultLocale,
      ),
    ).toBe('2020 – Present')
  })
  it('handles no arguments', () => {
    expect(
      employmentSubHeaderText(
        {
          startDate: '',
          endDate: '2022',
        },
        defaultLocale,
      ),
    ).toBe('Until 2022')
  })
})
