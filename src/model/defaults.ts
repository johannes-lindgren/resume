import {
  DetailsSection,
  Employment,
  EmploymentHistorySection,
  Resume,
  SkillCategory,
  SkillSection,
} from '@/model/resume'
import { uid } from '@/utils/uid'

export const newSkillCategory = (): SkillCategory => ({
  // TODO generate
  header: '',
  uid: uid(),
  skills: [],
})

export const newResume = (): Resume => ({
  name: '',
  jobTitle: '',
  emailAddress: '',
  location: '',
  phoneNumber: '',
  nationality: '',
  sections: [],
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
