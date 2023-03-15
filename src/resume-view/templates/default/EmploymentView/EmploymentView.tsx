import React, { FunctionComponent } from 'react'
import { Employment } from '@/model/resume'
import { createStyles, Style, Text, View } from '@/resume-view/primitives'
import { defaultTheme } from '@/resume-view/Theme'
import { Stack } from '@/resume-view/base-components'
import { employmentHeaderText } from '@/resume-view/templates/default/EmploymentView/employmentHeaderText'
import { employmentSubHeaderText } from '@/resume-view/templates/default/EmploymentView/EmploymentSubHeaderText'

const styles = createStyles({
  header: {
    ...defaultTheme.typography.header3,
  },
  date: {
    ...defaultTheme.typography.details,
  },
  achievement: {
    ...defaultTheme.typography.body,
    paddingLeft: defaultTheme.spacing(2),
    marginBottom: defaultTheme.spacing(1),
  },
})

export const EmploymentView: FunctionComponent<{
  employment: Employment
  style?: Style | undefined
}> = (props) => {
  const { employment } = props
  const achievements = employment.achievements.filter(
    ({ description }) => description !== '',
  )
  return (
    <Stack
      style={props.style}
      gap={2}
      wrap={false}
    >
      <Stack gap={1}>
        <EmploymentHeader
          jobTitle={employment.jobTitle}
          employer={employment.employer}
          location={employment.location}
        />
        <EmploymentSubHeader
          startDate={employment.startDate}
          endDate={employment.endDate}
        />
      </Stack>
      {achievements.length > 0 && (
        <Stack gap={1}>
          {achievements.map((achievement) => (
            <View
              key={achievement.uid}
              style={{
                flexDirection: 'row',
              }}
            >
              <Text>•</Text>
              <Text style={styles.achievement}>{achievement.description}</Text>
            </View>
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export const EmploymentHeader: FunctionComponent<
  Pick<Employment, 'jobTitle' | 'employer' | 'location'>
> = (props) =>
  employmentHeaderText(props) ? (
    <Text style={styles.header}>{employmentHeaderText(props)}</Text>
  ) : null

export const EmploymentSubHeader: FunctionComponent<
  Pick<Employment, 'startDate' | 'endDate'>
> = (props) =>
  employmentSubHeaderText(props) ? (
    <Text style={styles.date}>{employmentSubHeaderText(props)}</Text>
  ) : null
