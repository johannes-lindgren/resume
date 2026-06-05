import {
  DetailsSection,
  Employment,
  EmploymentHistorySection,
  Resume,
  ResumeTemplate,
  SkillCategory,
  SkillSection,
} from '@/model/resume'
import { uid } from '@/utils/uid'

export const defaultTemplate = (): ResumeTemplate => ({
  imageSize: 'small',
})

export const newSkillCategory = (): SkillCategory => ({
  // TODO generate
  header: '',
  uid: uid(),
  skills: [],
})

export const blankResume = (): Resume => ({
  image: undefined,
  name: '',
  jobTitle: '',
  emailAddress: '',
  location: '',
  phoneNumber: '',
  nationality: '',
  sections: [],
  template: defaultTemplate(),
})

export const resumeTemplate = (): Resume => ({
  image: undefined,
  name: '',
  jobTitle: '',
  emailAddress: '',
  location: '',
  phoneNumber: '',
  nationality: '',
  template: defaultTemplate(),
  sections: [
    {
      uid: uid(),
      type: 'details',
      header: 'Profile',
      description: '',
    },
    {
      uid: uid(),
      type: 'employmentHistory',
      header: 'Employment History',
      employments: [],
    },
    {
      uid: uid(),
      type: 'employmentHistory',
      header: 'Education',
      employments: [],
    },
    {
      uid: uid(),
      type: 'skills',
      header: 'Skills',
      skillCategories: [],
    },
  ],
})

export const newEmployment = (): Employment => ({
  // TODO generate uid
  uid: uid(),
  jobTitle: '',
  employer: '',
  location: '',
  startDate: '',
  endDate: '',
  achievements: [],
})

export const newSummarySection = (): DetailsSection => ({
  uid: uid(),
  type: 'details',
  header: 'Profile',
  description: '',
})

export const newEmploymentHistorySection = (): EmploymentHistorySection => ({
  uid: uid(),
  type: 'employmentHistory',
  header: 'Employments',
  employments: [],
})

export const newSkillsSection = (): SkillSection => ({
  uid: uid(),
  type: 'skills',
  header: 'Skills',
  skillCategories: [],
})

export const newEducationHistorySection = (): EmploymentHistorySection => ({
  uid: uid(),
  type: 'employmentHistory',
  header: 'Education',
  employments: [],
})
