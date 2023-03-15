import { Employment } from '@/model/resume'

export const employmentHeaderText = (
  employment: Pick<Employment, 'jobTitle' | 'employer' | 'location'>,
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
      : `${jobTitle} at ${employer}`
  return start ? (location ? `${start}, ${location}` : start) : location
}
