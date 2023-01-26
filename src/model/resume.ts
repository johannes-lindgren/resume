export type Resume = {
  name: string
  jobTitle: string
  nationality: string
  location: string
  emailAddress: string
  phoneNumber: string
  sections: Section[]
}

export type SkillSection = {
  type: 'skills'
  header: string
  skillCategories: SkillCategories[]
}

export type SkillCategories = {
  header: string
  skills: string[]
}

export type Section = DetailsSection | EmploymentHistorySection | SkillSection

export type DetailsSection = {
  type: 'details'
  header: string
  description: string
}

export type EmploymentHistorySection = {
  type: 'employmentHistory'
  header: string
  employments: Employment[]
}

export type Employment = {
  employer?: string
  jobTitle: string
  location: string
  startDate: string
  endDate: string
  achievements: string[]
}
