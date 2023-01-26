import React, {FunctionComponent} from "react";
import {Resume, SkillSection} from "@/model/resume";
import {Stack} from "@/components/pdf/Stack";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {theme} from "@/design/Theme";

const styles = StyleSheet.create({
  root: {
    ...theme.typography.caption,
  },
});

export const SkillSectionView: FunctionComponent<{
  section: SkillSection
}> = (props) => (
  <Stack style={styles.root} gap={3}>
    <Text style={{...theme.typography.header2}}>
      {props.section.header}
    </Text>
    {props.section.skillCategories.map((skillCategory, index) => (
      <Stack key={index} gap={2}>
        <Text style={{...theme.typography.header3}}>
          {skillCategory.header}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {skillCategory.skills.map((skill, index) => (
            <Text key={index} style={{marginRight: theme.spacing(2)}}>{skill}</Text>
          ))}
        </View>
      </Stack>
    ))}
  </Stack>
)