import { Employment } from '@/model/resume'

export const until = (locale: string | undefined): string =>
  ({
    sv: 'Fram tills',
    'en-US': 'Until',
  }[locale ?? 'en-US'] ?? until('en-US'))
export const present = (locale: string | undefined): string =>
  ({
    sv: 'Idag',
    'en-US': 'Present',
  }[locale ?? 'en-US'] ?? present('en-US'))

export const employmentSubHeaderText = (
  employment: Pick<Employment, 'startDate' | 'endDate'>,
  locale: string | undefined,
): string | undefined => {
  const { startDate, endDate } = employment
  if (startDate === '' && endDate === '') {
    return undefined
  }
  if (startDate === '' && endDate !== '') {
    return `${until(locale)} ${endDate}`
  }
  if (startDate !== '' && endDate === '') {
    return `${startDate} – ${present(locale)}`
  }
  return `${startDate} – ${endDate}`
}
