import { employmentHeaderText } from '@/resume-view/templates/default/EmploymentView/employmentHeaderText'

const employer = 'Evil Corporation'
const jobTitle = 'Slave'
const location = 'Cairo'

describe('employmentHeaderText', () => {
  it('handles everything together', () => {
    expect(
      employmentHeaderText({
        employer,
        jobTitle,
        location,
      }),
    ).toBe('Slave at Evil Corporation, Cairo')
  })
  it('handles no arguments', () => {
    expect(
      employmentHeaderText({
        jobTitle: '',
        employer: '',
        location: '',
      }),
    ).toBe(undefined)
  })
  it('handles only jobTitle', () => {
    expect(
      employmentHeaderText({
        jobTitle,
        employer: '',
        location: '',
      }),
    ).toBe('Slave')
  })
  it('handles only employer', () => {
    expect(
      employmentHeaderText({
        jobTitle: '',
        employer,
        location: '',
      }),
    ).toBe('Evil Corporation')
  })
  it('handles only location', () => {
    expect(
      employmentHeaderText({
        jobTitle: '',
        employer: '',
        location,
      }),
    ).toBe('Cairo')
  })
  it('handles only jobTitle and employer', () => {
    expect(
      employmentHeaderText({
        jobTitle,
        employer,
        location: '',
      }),
    ).toBe('Slave at Evil Corporation')
  })
  it('handles only jobTitle and location', () => {
    expect(
      employmentHeaderText({
        jobTitle,
        employer: '',
        location,
      }),
    ).toBe('Slave, Cairo')
  })
  it('handles only employer and location', () => {
    expect(
      employmentHeaderText({
        jobTitle: '',
        employer,
        location,
      }),
    ).toBe('Evil Corporation, Cairo')
  })
})
