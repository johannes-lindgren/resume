import React, { FunctionComponent } from 'react'
import { SkillCategory, SkillSection } from '@/model/resume'
import { Stack } from '@/components/pdf/Stack'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { theme } from '@/design/Theme'

const styles = StyleSheet.create({
  root: {
    ...theme.typography.caption,
  },
})

export const SkillSectionView: FunctionComponent<{
  section: SkillSection
}> = (props) => (
  <Stack
    style={styles.root}
    gap={3}
  >
    <Stack
      wrap={false}
      gap={3}
    >
      <Text style={{ ...theme.typography.header2 }}>
        {props.section.header}
      </Text>
      {props.section.skillCategories.slice(0, 1).map((skillCategory, index) => (
        <SkillCategoryView
          key={index}
          skillCategory={skillCategory}
        />
      ))}
    </Stack>
    {props.section.skillCategories.slice(1).map((skillCategory, index) => (
      <SkillCategoryView
        key={index}
        skillCategory={skillCategory}
      />
    ))}
  </Stack>
)

export const SkillCategoryView: FunctionComponent<{
  skillCategory: SkillCategory
}> = ({ skillCategory }) => (
  <Stack
    gap={2}
    wrap={false}
  >
    <Text style={{ ...theme.typography.header3 }}>{skillCategory.header}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {skillCategory.skills.map((skill, index) => (
        <Text
          key={index}
          style={{ marginRight: theme.spacing(2) }}
        >
          {skill}
        </Text>
      ))}
    </View>
  </Stack>
)
