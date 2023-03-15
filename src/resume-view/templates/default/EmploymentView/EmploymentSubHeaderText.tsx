import { Employment } from '@/model/resume'

export const employmentSubHeaderText = (
  employment: Pick<Employment, 'startDate' | 'endDate'>,
): string | undefined => {
  const { startDate, endDate } = employment
  if (startDate === '' && endDate === '') {
    return undefined
  }
  if (startDate === '' && endDate !== '') {
    return `Until ${endDate}`
  }
  if (startDate !== '' && endDate === '') {
    return `${startDate} – Present`
  }
  return `${startDate} – ${endDate}`
}
