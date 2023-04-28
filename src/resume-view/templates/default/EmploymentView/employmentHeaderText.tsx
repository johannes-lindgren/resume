import { Employment } from '@/model/resume'
import { defaultLocale } from '@/resume-view/templates/default/EmploymentView/defaultLocale'

export const preposition = (locale: string | undefined): string =>
  ({
    sv: 'vid',
    'en-US': 'at',
  }[locale ?? defaultLocale] ?? preposition(defaultLocale))

export const employmentHeaderText = (
  employment: Pick<Employment, 'jobTitle' | 'employer' | 'location'>,
  locale: string | undefined,
): string | undefined => {
  const { employer, location, jobTitle } = employment
  if (employer === '' && location === '' && jobTitle === '') {
    return undefined
  }
  const start =
    jobTitle === ''
      ? employer === ''
        ? undefined
        : employer
      : employer === ''
      ? jobTitle
      : `${jobTitle} ${preposition(locale)} ${employer}`
  return start ? (location ? `${start}, ${location}` : start) : location
}
