import React, { FunctionComponent } from 'react'
import { SkillCategory, SkillSection } from '@/model/resume'
import { Stack } from '@/components/pdf/Stack'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'

const styles = StyleSheet.create({
  root: {
    ...defaultTheme.typography.caption,
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
      <Text style={{ ...defaultTheme.typography.header2 }}>
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
    <Text style={{ ...defaultTheme.typography.header3 }}>
      {skillCategory.header}
    </Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {skillCategory.skills.map((skill) => (
        <Text
          key={skill.uid}
          style={{ marginRight: defaultTheme.spacing(2) }}
        >
          {skill.label}
        </Text>
      ))}
    </View>
  </Stack>
)
