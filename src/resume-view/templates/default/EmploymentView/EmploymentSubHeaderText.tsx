import { Employment } from '@/model/resume'
import { defaultLocale } from '@/resume-view/templates/default/EmploymentView/defaultLocale'

export const until = (locale: string | undefined): string =>
  ({
    sv: 'Fram tills',
    'en-US': 'Until',
  }[locale ?? defaultLocale] ?? until(defaultLocale))
export const present = (locale: string | undefined): string =>
  ({
    sv: 'Idag',
    'en-US': 'Present',
  }[locale ?? defaultLocale] ?? present(defaultLocale))

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
