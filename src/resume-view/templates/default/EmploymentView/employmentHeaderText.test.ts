import { employmentHeaderText } from '@/resume-view/templates/default/EmploymentView/employmentHeaderText'

const employer = 'Evil Corporation'
const jobTitle = 'Slave'
const location = 'Cairo'

const defaultLocale = 'en-US'

describe('employmentHeaderText', () => {
  it('handles everything together', () => {
    expect(
      employmentHeaderText(
        {
          employer,
          jobTitle,
          location,
        },
        defaultLocale,
      ),
    ).toBe('Slave at Evil Corporation, Cairo')
  })
  it('handles no arguments', () => {
    expect(
      employmentHeaderText(
        {
          jobTitle: '',
          employer: '',
          location: '',
        },
        defaultLocale,
      ),
    ).toBe(undefined)
  })
  it('handles only jobTitle', () => {
    expect(
      employmentHeaderText(
        {
          jobTitle,
          employer: '',
          location: '',
        },
        defaultLocale,
      ),
    ).toBe('Slave')
  })
  it('handles only employer', () => {
    expect(
      employmentHeaderText(
        {
          jobTitle: '',
          employer,
          location: '',
        },
        defaultLocale,
      ),
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
      employmentHeaderText(
        {
          jobTitle,
          employer,
          location: '',
        },
        defaultLocale,
      ),
    ).toBe('Slave at Evil Corporation')
  })
  it('handles only jobTitle and location', () => {
    expect(
      employmentHeaderText(
        {
          jobTitle,
          employer: '',
          location,
        },
        defaultLocale,
      ),
    ).toBe('Slave, Cairo')
  })
  it('handles only employer and location', () => {
    expect(
      employmentHeaderText(
        {
          jobTitle: '',
          employer,
          location,
        },
        defaultLocale,
      ),
    ).toBe('Evil Corporation, Cairo')
  })
})
