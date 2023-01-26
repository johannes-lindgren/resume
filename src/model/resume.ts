export type Resume = {
  name: string
  jobTitle: string
  nationality: string
  location: string
  emailAddress: string
  phoneNumber: string
  sections: ResumeSection[]
}

export type SkillCategories = {
  header: string
  skills: string[]
}

export type ResumeSection =
  | DetailsSection
  | EmploymentHistorySection
  | SkillSection

export type DetailsSection = {
  uid: string
  type: 'details'
  header: string
  description: string
}

export type EmploymentHistorySection = {
  uid: string
  type: 'employmentHistory'
  header: string
  employments: Employment[]
}

export type SkillSection = {
  uid: string
  type: 'skills'
  header: string
  skillCategories: SkillCategories[]
}

export type Employment = {
  uid: string
  employer?: string
  jobTitle: string
  location: string
  startDate: string
  endDate: string
  achievements: string[]
}
