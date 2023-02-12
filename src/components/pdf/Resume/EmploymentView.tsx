import React, { FunctionComponent } from 'react'
import { Employment } from '@/model/resume'
import { Style } from '@react-pdf/types'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'
import { Stack } from '@/components/pdf/Stack'

const styles = StyleSheet.create({
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
  emloyment: Employment
  style?: Style | Style[] | undefined
}> = (props) => (
  <Stack
    style={props.style}
    gap={2}
    wrap={false}
  >
    <Stack gap={1}>
      <Text style={styles.header}>
        {props.emloyment.jobTitle}
        {props.emloyment.employer && ` at ${props.emloyment.employer}`},{' '}
        {props.emloyment.location}
      </Text>
      <Text style={styles.date}>
        {props.emloyment.startDate} – {props.emloyment.endDate}
      </Text>
    </Stack>
    <Stack gap={1}>
      {props.emloyment.achievements.map((achievement) => (
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
  </Stack>
)
