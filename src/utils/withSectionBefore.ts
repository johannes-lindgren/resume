import { Resume, ResumeSection } from '@/model/resume'
import { withAfter, withBefore } from '@/utils/withBefore'

export const withSectionBefore = (
  resume: Resume,
  refUid: string,
  section: ResumeSection,
): Resume => ({
  ...resume,
  sections: withBefore(
    resume.sections,
    section,
    (section) => section.uid === refUid,
  ),
})
export const withSectionAfter = (
  resume: Resume,
  refUid: string,
  section: ResumeSection,
): Resume => ({
  ...resume,
  sections: withAfter(
    resume.sections,
    section,
    (section) => section.uid === refUid,
  ),
})
